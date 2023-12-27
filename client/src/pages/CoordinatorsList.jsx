import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CoordinatorsList(){
    const navigateTo = useNavigate();
    
    const [coordinators, setCoordinators] = useState([]);
    const [users, setUsers] = useState([]);
    const [lessons, setLessons] = useState([])
    
    useEffect(() => {
        axios.get("http://localhost:3000/coordinators")
        .then(result => { 
            setCoordinators(result.data);
            axios.get("http://localhost:3000/users/" + "coordinator")
            .then(result => {
                setUsers(result.data);
                axios.get("http://localhost:3000/schoolSubjects")
                .then(result => setLessons(result.data))
                .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    }, [coordinators])

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

    const Delete = (coordinator) => {
        axios.delete("http://localhost:3000/deleteUser/" + coordinator.user)
        .then(result => {
            axios.delete("http://localhost:3000/deleteCoordinator/" + coordinator._id)
            .then(result => console.log(result))
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    }

    if(coordinators.length > 0){
        return(
            <>
                <h1>רשימת המורים.ות</h1>
                <button className="form-button" onClick = {() => navigateTo("add-coordinator")}>הוספת מורה</button>
                <table>
                    <thead>
                        <tr>
                            <th className="index-column"></th>
                            <th>שם משפחה</th>
                            <th>שם פרטי</th>
                            <th>שם משתמש</th>
                            <th>סיסמה</th>
                            <th>רכז</th>
                            <th>מקצועות לימוד</th>
                            <th>פעולות</th>
                        </tr>
                    </thead>
                    <tbody>
                        {coordinators.map((coordinator, index) => (
                            <tr key={index}>
                                <td className="index-column">{index + 1}</td>
                                {findUsers(coordinator.user)}
                                <td>{findSubject(coordinator.major)}</td>
                                <td>
                                    {coordinator.lessons.map((lesson, ind) => (
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
                                    <button className="form-button" onClick = {() => Delete(coordinator)}>הסרה</button>
                                    <button className="form-button" onClick = {() => navigateTo("update-coordinator/" + coordinator._id)}>עדכון</button>
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
                <button className="form-button" onClick = {() => navigateTo("add-coordinators")}>הוספת מורה</button>
                <h3>אין מורים.ות בבית הספר שניתן להציג</h3>
            </>
        )
    }
}

export default CoordinatorsList;