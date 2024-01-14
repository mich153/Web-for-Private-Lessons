import axios from "axios";
import React, {useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";

function Students(){    
    const navigateTo = useNavigate();
    const {class_id, class_number} = useParams();
    const [students, setStudents] = useState([]);
    const [users, setUsers] = useState([]);
    const [cls, setClass] = useState();
    
    useEffect(() => {
        axios.get("http://localhost:3000/class/" + class_id)
        .then(result => setClass(result.data))
        .catch(err => console.log(err))

        axios.get("http://localhost:3000/studentsFromClass/" + class_id)
        .then(result => { 
            setStudents(result.data.filter(filterStudents));
            axios.get("http://localhost:3000/users/" + "student")
            .then(result => setUsers(result.data))
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    }, [students])
    
    function filterStudents(student){
        return student.class_number == class_number
    }

    function findUsers(id){
        for(var i = 0; i < users.length; i++)
            if(id == users[i]._id)
                return <><td>{users[i].last_name}</td>
                <td>{users[i].first_name}</td>
                <td>{users[i].username}</td>
                <td>{users[i].password}</td></>
    }

    const Delete = (student) => {
        axios.delete("http://localhost:3000/deleteUser/" + student.user)
        .then(result => {
            axios.delete("http://localhost:3000/deleteStudent/" + student._id)
            .then(result => console.log(result))
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    }

    if(students.length > 0){
        return(
            <>
                <h1>רשימת התלמידים.ות בכיתה {cls.age_group + class_number}</h1>
                
                <button className="form-button" onClick = {() => navigateTo("../add-student")}>הוספת תלמיד.ה</button>
                
                <table>
                    <thead>
                        <tr>
                            <th className="index-column"></th>
                            <th>שם משפחה</th>
                            <th>שם פרטי</th>
                            <th>שם משתמש</th>
                            <th>סיסמה</th>
                            <th>מספר תעודת זהות</th>
                            <th>פעולות</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <tr key={index}>
                                <td className="index-column">{index + 1}</td>
                                {findUsers(student.user)}
                                <td>{student.id}</td>
                                <td>
                                    <button className="form-button" onClick = {() => Delete(student)}>הסרה</button>
                                    <button className="form-button" onClick = {() => navigateTo("../update-student/" + student._id)}>עדכון</button>
                                </td>
                            </tr> 
                        ))}
                    </tbody>
                </table>
            </>
        );
    } else{
        return(
            <>
                <h1>רשימת התלמידים</h1>
                    
                <button className="form-button" onClick = {() => navigateTo("../add-student")}>הוספת תלמיד.ה</button>
                
                <h3>אין תלמידים.ות להצגה בכיתה זו</h3>
            </>
        );
    }
}

export default Students;