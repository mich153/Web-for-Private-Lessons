import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LessonsList(){
    const navigateTo = useNavigate();
    const [user, setUser] = useState({type: ''});
    const [lessons, setLessons] = useState([]);
    const [days, setDays] = useState(['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי']);
    const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [classes, setClasses] = useState([]);
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        let userType = window.localStorage.getItem("type");
        let userID = window.localStorage.getItem("id");

        axios.get("http://localhost:3000/schoolSubjects")
        .then(result => setSubjects(result.data))
        .catch(err => console.log(err))

        axios.get("http://localhost:3000/user/" + userID)
        .then(result => setUser(result.data))
        .catch(err => console.log(err))

        axios.get("http://localhost:3000/teachers")
        .then(result => {
            axios.get("http://localhost:3000/coordinators")
            .then(res => {
                setTeachers([...result.data, ...res.data])
            })
            .catch(err => console.log(err))
        })

        axios.get("http://localhost:3000/students")
        .then(result => setStudents(result.data))
        .catch(err => console.log(err))

        axios.get("http://localhost:3000/classes")
        .then(result => setClasses(result.data))
        .catch(err => console.log(err))

        if(userType == 'student'){
            axios.get("http://localhost:3000/findStudentByUserID/" + userID)
            .then(result => {
                axios.get("http://localhost:3000/lessonsByStudens/" + result.data._id)
                .then(result => {
                    setLessons(result.data);
                    axios.get("http://localhost:3000/users/teacher")
                    .then(result => {
                        axios.get("http://localhost:3000/users/coordinator")
                        .then(res => {
                            setUsers([...result.data, ...res.data])
                        })
                        .catch(err => console.log(err))
                    })
                })
                .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
        } else if(userType == 'teacher'){
            axios.get("http://localhost:3000/findTeacherByUser/" + userID)
            .then(result => {
                axios.get("http://localhost:3000/lessonsByTeacher/" + result.data._id)
                .then(result => {
                    setLessons(result.data);
                    axios.get("http://localhost:3000/users/student")
                    .then(res => setUsers(res.data))
                    .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
        } else{
            axios.get("http://localhost:3000/coordinator/" + userID)
            .then(result => {
                axios.get("http://localhost:3000/lessonsByTeacher/" + result.data._id)
                .then(result => {
                    setLessons(result.data);
                    axios.get("http://localhost:3000/users/student")
                    .then(res => setUsers(res.data))
                    .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
        }
    })

    function DeleteLesson(e, id){
        e.preventDefault();
        axios.delete("http://localhost:3000/deleteLesson/" + id)
        .then(result => console.log(result.data))
        .catch(err => console.log(err))

    }

    function findTeacher(id){
        let index = teachers.findIndex(function(t){return t._id == id});
        if(index != -1){
            let userID = teachers[index].user;
            index = users.findIndex(function(u){return u._id == userID});
            if(index != -1){
                return users[index].first_name + ' ' + users[index].last_name;
            }
        }
        return index;
    }

    function findSubject(id){
        let index = subjects.findIndex(function(s){return s._id == id});
        return index == -1? index:  subjects[index].name;
    }

    function findStudent(id){
        let index = students.findIndex(function(s){return s._id == id});
        if(index != -1){
            let userID = students[index].user;
            index = users.findIndex(function(u){return u._id == userID});
            if(index != -1){
                const name = users[index].first_name + ' ' + users[index].last_name;
                const id = students[index].id;
                const classID = students[index].cls;
                const classIndex = classes.findIndex(function(c){return c._id == classID})
                const cls = classes[classIndex].age_group + students[index].class_number;
                return(
                    <ul>
                         <li>שם: {name}</li>
                        <li>ת.ז: {id}</li>
                        <li>כיתה: {cls}</li>
                    </ul>
                );
            }
        }
        return index;
    }

    function printTimes(day){
        let lessonsInDay = lessons.filter(function(a){return a.day == day});
        lessonsInDay.sort(function(a, b){return a.time_start.localeCompare(b.time_start)});
        if(user.type == 'student'){
            return(
                lessonsInDay.map((l, i) => (
                    <ul className='time-list'>
                        <li>שעה: 
                            <p>{l.time_start + '-' + l.time_end}</p>
                        </li>
                        <li>מקצוע: 
                            <p>{findSubject(l.subject) + '- ' + l.unit + ' יח"ל'}</p>
                        </li>
                        <li>מורה: 
                            <p>{findTeacher(l.teacher)}</p>
                        </li>
                        <button className='form-button'
                        onClick={(e) => DeleteLesson(e, l._id)}
                        >מחיקה</button>
                    </ul>
                ))
            )
        } else{
            return(
                lessonsInDay.map((l, i) => (
                    <ul className='time-list'>
                        <li>שעה: 
                            <p>{l.time_start + '-' + l.time_end}</p>
                        </li>
                        <li>מקצוע: 
                            <p>{findSubject(l.subject) + '- ' + l.unit + ' יח"ל'}</p>
                        </li>
                        <li>תלמיד.ה: {findStudent(l.student)}</li>
                        <button className='form-button'
                        onClick={(e) => DeleteLesson(e, l._id)}
                        >מחיקה</button>
                    </ul>
                ))
            )
        }
    }

    return(
        <>
            <h1>לוח תגבורים</h1>
            <button className='form-button' onClick={(e) => navigateTo('../registration')}>הוספה</button>
            <table>
                <thead>
                    <tr>
                        {days.map((day, index) => (<th id={day}>{day}</th>))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {days.map((day, index) => (
                            <td>{printTimes(day)}</td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default LessonsList;