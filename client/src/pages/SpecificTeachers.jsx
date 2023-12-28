import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function SpecificTeachers(){
    const subjectID = useParams();
    const [teachers, setTeachers] = useState([]);
    const [users, setUsers] = useState([]);
    const [lessons, setLessons] = useState([])
    
    useEffect(() => {
        axios.get("http://localhost:3000/teachers")
        .then(result => {
            if(!teachers || teachers.length == 0){
                for(let i = 0; i < result.data.length; i++){
                    for(let j = 0; j < result.data[i].lessons.length; j++){
                        var lesson = result.data[i].lessons[j];
                        if(lesson[0] == subjectID.subject){
                            setTeachers([...teachers, result.data[i]])
                            break;
                        }
                    }
                }
            }
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
                <td>{users[i].first_name}</td></>
    }

    function findSubject(id){
        for(var i = 0; i < lessons.length; i++)
            if(id == lessons[i]._id)
                return lessons[i].name;
    }

    function findUnits(teacher){
        let l = [];
        for(let i = 0; i < teacher.lessons.length; i++){
            if(teacher.lessons[i][0] == subjectID.subject){
                l = teacher.lessons[i];
            }
        }
        return(l[1].map((u, i) => (
            <li>{u} יח"ל</li>
        )))
    }

    if(teachers.length > 0){
        return(
            <>
                <h1>רשימת המורים.ות ב{findSubject(subjectID.subject)}</h1>
                <table>
                    <thead>
                        <tr>
                            <th className="index-column"></th>
                            <th>שם משפחה</th>
                            <th>שם פרטי</th>
                            <th>כמות שיעורים שהועברו במקצוע</th>
                            <th>כמות היח"ל שבהם מלמד.ת</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teachers.map((teacher, index) => (
                            <tr key={index}>
                                <td className="index-column">{index + 1}</td>
                                {findUsers(teacher.user)}
                                <td>{teacher.teaching}</td>
                                <td>
                                    <ul>
                                        {findUnits(teacher)}
                                    </ul>
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
                <h1>רשימת המורים.ות ב{findSubject(subjectID.subject)}</h1>
                <h3>אין מורים.ות שמתגברים מקצוע זה</h3>
            </>
        )
    }
}

export default SpecificTeachers;