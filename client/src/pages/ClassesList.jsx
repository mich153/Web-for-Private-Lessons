import axios from "axios";
import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

function Classes(){    
    const navigateTo = useNavigate();

    const MAX_CLASSES_COUNT = 12;

    const [classes, setClasses] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/classes")
        .then(result => setClasses(result.data))
        .catch(err => console.log(err))
    }, [classes])
    
    classes.sort(function(a ,b) {return (a.age_group).localeCompare(b.age_group)});
    
    const classesInUse = [];
    for(let i = 0 ; i < classes.length ; i++){
        if(classes[i].classes_counter_in_age_group > 0){
            classesInUse.push(classes[i]);
        }
    }
    
    const Update = (id, classesCounter) => {
        axios.put('http://localhost:3000/updateClass/' + id, {classesCounter})
        .then(result => console.log(result))
        .catch(err => console.log(err))
    }

    if(classesInUse.length > 0){
        return(
            <>
                <h1>רשימת השכבות</h1>
                
                <button className="form-button" onClick = {() => navigateTo("add-class")}>הוספת שכבה</button>
                
                <table>
                    <thead>
                        <tr>
                            <th className="index-column"></th>
                            <th>שכבה</th>
                            <th>כמות כיתות</th>
                            <th>פעולות</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classesInUse.map((cls, index) => (
                            <tr key={index}>
                                <td className="index-column">{index + 1}</td>
                                <td>{cls.age_group}</td>
                                <td>{cls.classes_counter_in_age_group}</td>
                                <td>
                                    <button className="form-button" 
                                    onClick = {(e) => {
                                        if(cls.classes_counter_in_age_group < MAX_CLASSES_COUNT){
                                            Update(cls._id, cls.classes_counter_in_age_group + 1);
                                        } else{
                                            document.getElementsByClassName("error")[index].innerHTML = "לא ניתן להוסיף עוד כיתות לשכבה זו";
                                            document.getElementsByClassName("error")[index].style.padding = "10px";
                                        }
                                        }}>+</button> 
                                    <button className="form-button" 
                                    onClick = {(e) => {
                                        document.getElementsByClassName("error")[index].innerHTML = "";
                                        document.getElementsByClassName("error")[index].style.padding = "0px";
                                        Update(cls._id, cls.classes_counter_in_age_group - 1);
                                        }}>-</button>
                                    <button className="form-button" 
                                    onClick = {(e) => Update(cls._id, 0)}>מחיקה</button>
                                    <p className="error"></p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>
        );
    } 
    else{
        return(
            <>
                <h1>רשימת השכבות</h1>
                    
                <button className="form-button" onClick = {() => navigateTo("add-class")}>הוספת שכבה</button>
                
                <h3>אין שכבות בבית הספר להצגה</h3>
            </>
        );
    }
}

export default Classes;