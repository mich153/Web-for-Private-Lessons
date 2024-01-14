import axios from "axios";
import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";

function StudentsInfoStudy(){   
    const {class_id, class_number} = useParams();
    const [students, setStudents] = useState([]);
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState();
    const [cls, setClass] = useState();
    
    useEffect(() => {
        axios.get("http://localhost:3000/class/" + class_id)
        .then(result => setClass(result.data))
        .catch(err => console.log(err))
        
        axios.get("http://localhost:3000/coordinator/" + window.localStorage.getItem("id"))
        .then(result => setUser(result.data))
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
                <td>{users[i].first_name}</td></>
    }

    function lessonsCount(learned){
        if(!learned){
            return 0;
        }
        let index = learned.findIndex(function(l){return l[0] == user.major})
        if(index == -1){
            return 0;
        }
        return learned[index][1];
    }

    if(students.length > 0){
        return(
            <>
                <h1>רשימת התלמידים.ות בכיתה {cls.age_group + class_number}</h1>

                <table>
                    <thead>
                        <tr>
                            <th className="index-column"></th>
                            <th>שם משפחה</th>
                            <th>שם פרטי</th>
                            <th>מספר תעודת זהות</th>
                            <th>נוכחות</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <tr key={index}>
                                <td className="index-column">{index + 1}</td>
                                {findUsers(student.user)}
                                <td>{student.id}</td>
                                <td>{lessonsCount(student.learned_lessons)}</td>
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
                
                <h3>אין תלמידים.ות להצגה בכיתה זו</h3>
            </>
        );
    }
}

export default StudentsInfoStudy;