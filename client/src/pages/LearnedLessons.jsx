import axios from "axios";
import React, {useEffect, useState} from "react";

function LearnedLessons(){
    const [user, setUser] = useState({learned_lessons: []});
    const [subjects, setSubjects] = useState();
    
    useEffect(() => {
        axios.get("http://localhost:3000/findStudentByUserID/" + window.localStorage.getItem("id"))
        .then(result => setUser(result.data))
        .catch(err => console.log(err))
        
        axios.get("http://localhost:3000/schoolSubjects")
        .then(result => setSubjects(result.data))
        .catch(err => console.log(err))
    }, [subjects])
    
    function findSubject(id){
        let index = subjects.findIndex(function(s){return s._id == id});
        return index == -1? index: subjects[index].name;
    }

    return(
        <>
            <h1>נוכחות</h1>

            <table>
                <thead>
                    <tr>
                        <th className="index-column"></th>
                        <th>מקצוע</th>
                        <th>נוכחות</th>
                    </tr>
                </thead>
                <tbody>
                    {user.learned_lessons.sort(function(a, b){return findSubject(a[0]).localeCompare(findSubject(b[0]))}).map((l, i) => (
                        <tr>
                            <td className="index-column">{i + 1}</td>
                            <td>{findSubject(l[0])}</td>
                            <td>{l[1]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default LearnedLessons;