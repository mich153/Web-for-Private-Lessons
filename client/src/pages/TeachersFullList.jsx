import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function TeachersFullList(){
    const navigateTo = useNavigate();
    
    const [teachers, setTeachers] = useState([]);
    const [users, setUsers] = useState([]);
    const [lessons, setLessons] = useState([])
    
    useEffect(() => {
        axios.get("http://localhost:3000/teachers")
        .then(result => { 
            setTeachers(result.data);
            axios.get("http://localhost:3000/users/" + "teacher")
            .then(result => {
                setUsers(result.data);
                axios.get("http://localhost:3000/schoolSubjects")
                .then(result => setLessons(result.data))
                .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    }, [teachers])

    function findUsers(id){
        for(var i = 0; i < users.length; i++)
            if(id == users[i]._id)
                return <><td>{users[i].last_name}</td>
                <td>{users[i].first_name}</td>
                <td>{users[i].username}</td>
                <td>{users[i].password}</td></>
    }

    function findSubject(id){
        for(var i = 0; i < lessons.length; i++)
            if(id == lessons[i]._id)
                return lessons[i].name;
    }

    const Delete = (teacher) => {
        axios.delete("http://localhost:3000/deleteUser/" + teacher.user)
        .then(result => {
            axios.delete("http://localhost:3000/deleteTeacher/" + teacher._id)
            .then(result => console.log(result))
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    }

    if(teachers.length > 0){
        return(
            <>
                <h1>רשימת המורים.ות</h1>
                <button className="form-button" onClick = {() => navigateTo("add-teacher")}>הוספת מורה</button>
                <table>
                    <thead>
                        <tr>
                            <th className="index-column"></th>
                            <th>שם משפחה</th>
                            <th>שם פרטי</th>
                            <th>שם משתמש</th>
                            <th>סיסמה</th>
                            <th>מקצועות לימוד</th>
                            <th>פעולות</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teachers.map((teacher, index) => (
                            <tr key={index}>
                                <td className="index-column">{index + 1}</td>
                                {findUsers(teacher.user)}
                                <td>
                                    {teacher.lessons.map((lesson, ind) => (
                                        <ul>
                                            <li key={lesson[0]}>{findSubject(lesson[0])}</li>
                                            <ul key={lesson[0] + "units list"}>
                                                {lesson[1].map((unit, i) => (
                                                    <li key={lesson[0] + "unit:" + unit}>{unit} יח"ל</li>
                                                ))}
                                            </ul>
                                        </ul>
                                    ))}
                                </td>
                                <td>
                                    <button className="form-button" onClick = {() => Delete(teacher)}>הסרה</button>
                                    <button className="form-button" onClick = {() => navigateTo("update-teacher/" + teacher._id)}>עדכון</button>
                                </td>
                            </tr> 
                        ))}
                    </tbody>
                </table>
            </>
        )
    } else{
        return(
            <>
                <h1>רשימת המורים.ות</h1>
                <button className="form-button" onClick = {() => navigateTo("add-teacher")}>הוספת מורה</button>
                <h3>אין מורים.ות בבית הספר שניתן להציג</h3>
            </>
        )
    }
}

export default TeachersFullList;