import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LessonsReport(){
    const navigateTo = useNavigate();
    const [lessons, setLessons] = useState([]);
    const [days, setDays] = useState(['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי']);
    const [students, setStudents] = useState([]);
    const [user, setUser] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [classes, setClasses] = useState([]);
    const [users, setUsers] = useState([]);
    const [modal, setModal] = useState(false);
    const [lesson, setLesson] = useState();
    const [teachers, setTeachers] = useState([]);

    const toggleModal = () => {
        setModal(!modal);
    }
    if(modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }
    
    useEffect(() => {
        let userType = window.localStorage.getItem("type");
        let userID = window.localStorage.getItem("id");

        axios.get("http://localhost:3000/user/" + userID)
        .then(result => setUser(result.data))
        .catch(err => console.log(err))

        axios.get("http://localhost:3000/teachers")
        .then(result => setTeachers(result.data))
        .catch(err => console.log(err))

        axios.get("http://localhost:3000/schoolSubjects")
        .then(result => setSubjects(result.data))
        .catch(err => console.log(err))

        axios.get("http://localhost:3000/students")
        .then(result => setStudents(result.data))
        .catch(err => console.log(err))

        axios.get("http://localhost:3000/classes")
        .then(result => setClasses(result.data))
        .catch(err => console.log(err))

        if(userType == 'teacher'){
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
        } else{ //the user is a coordinator
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
    }, [subjects])

    function findSubject(id){
        let index = subjects.findIndex(function(s){return s._id == id});
        return index == -1? index: subjects[index].name;
    }

    function findTeacher(id){
        let index = teachers.findIndex(function(t){return t._id == id});
        if(index != -1){
            return teachers[index];
        }
        return index;
    }

    function findStudent(id){
        let index = students.findIndex(function(s){return s._id == id});
        if(index != -1){
            return students[index];
        }
        return index;
    }

    function report(){
        let student = findStudent(lesson.student);
        if(!student.learned_lessons || student.learned_lessons.length == 0){
            let learned = [[lesson.subject, 1]]
            axios.put("http://localhost:3000/studentLearn/" + lesson.student, {learned})
            .then(result => console.log(result.data))
            .catch(err => console.log(err))
        } else{
            let index = student.learned_lessons.findIndex(function(l){return l[0] == lesson.subject});
            if(index == -1){
                let learned = student.learned_lessons;
                learned.push([lesson.subject, 1]);
                axios.put("http://localhost:3000/studentLearn/" + lesson.student, {learned})
                .then(result => console.log(result.data))
                .catch(err => console.log(err))
            } else{
                let learned = student.learned_lessons;
                learned[index][1] += 1;
                axios.put("http://localhost:3000/studentLearn/" + lesson.student, {learned})
                .then(result => console.log(result.data))
                .catch(err => console.log(err))
            }
        }
        let userType = window.localStorage.getItem("type");
        if(userType == 'teacher'){
            let teacher = findTeacher(lesson.teacher);
            if(!teacher.teaching || teacher.teaching.length == 0){
                let teachingLessons = [[lesson.subject, 1]]
                axios.put("http://localhost:3000/teacherTeached/" + lesson.teacher, {teachingLessons})
                .then(result => console.log(result.data))
                .catch(err => console.log(err))
            } else{
                let index = teacher.teaching.findIndex(function(l){return l[0] == lesson.subject});
                if(index == -1){
                    let teachingLessons = teacher.teaching;
                    teachingLessons.push([lesson.subject, 1]);
                    axios.put("http://localhost:3000/teacherTeached/" + lesson.teacher, {teachingLessons})
                    .then(result => console.log(result.data))
                    .catch(err => console.log(err))
                } else{
                    let teachingLessons = teacher.teaching;
                    teachingLessons[index][1] += 1;
                    axios.put("http://localhost:3000/teacherTeached/" + lesson.teacher, {teachingLessons})
                    .then(result => console.log(result.data))
                    .catch(err => console.log(err))
                }
            }
        }
        toggleModal();
    }

    function PrintStudent(id){
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
        return(
            lessonsInDay.map((l, i) => (
                <button className='small-button'
                onClick={() => {
                    setLesson(l);
                    toggleModal();
                }}>
                    <ul>
                        <li>שעה: 
                            <p>{l.time_start + '-' + l.time_end}</p>
                        </li>
                        <li>מקצוע: 
                            <p>{findSubject(l.subject) + '- ' + l.unit + ' יח"ל'}</p>
                        </li>
                        <li>תלמיד.ה: {PrintStudent(l.student)}</li>
                    </ul>
                </button>
            ))
        )
    }

    return(
        <>
            <h1>דיווח על ביצוע שיעור</h1>
            <h3>בחר את השיעור שברצונך לדווח שבוצע</h3>
            <table>
                <thead>
                    <tr>
                        {days.map((day, index) => (<th id={day}>{day}</th>))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {days.map((day, index) => (
                            <td>
                                {printTimes(day)}
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                        <h4>האם את.ה בטוח.ה שברצונך לדווח ששיעור זה התקיים?</h4>
                        <button className="small-button" onClick={() => toggleModal()}>ביטול</button>
                        <button className="submit-btn-modal submit-button" onClick={() => report()}>אישור</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default LessonsReport;