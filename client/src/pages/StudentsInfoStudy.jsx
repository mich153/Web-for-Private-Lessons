import axios from "axios";
import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";

function StudentsInfoStudy(){   
    const {class_id, class_number} = useParams();
    const [students, setStudents] = useState([]);
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        axios.get("http://localhost:3000/studentsFromClass/" + class_id)
        .then(result => { 
            setStudents(result.data.filter(filterStudents));
            axios.get("http://localhost:3000/user/" + "student")
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

    if(students.length > 0){
        return(
            <>
                <h1>רשימת התלמידים.ות בכיתה </h1>

                <table>
                    <thead>
                        <tr>
                            <th className="index-column"></th>
                            <th>שם משפחה</th>
                            <th>שם פרטי</th>
                            <th>מספר תעודת זהות</th>
                            <th>נוכחות</th>
                            <th>היעדרות</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <tr key={index}>
                                <td className="index-column">{index + 1}</td>
                                {findUsers(student.user)}
                                <td>{student.id}</td>
                                <td>{student.learned_lessons}</td>
                                <td>{student.total_lessons - student.learned_lessons}</td>
                            </tr> 
                        ))}
                    </tbody>
                </table>

                <Footer />
            </>
        );
    } else{
        return(
            <>
                <h1>רשימת התלמידים</h1>
                
                <h3>אין תלמידים.ות להצגה בכיתה זו</h3>
                
                <Footer />
            </>
        );
    }
}

export default StudentsInfoStudy;