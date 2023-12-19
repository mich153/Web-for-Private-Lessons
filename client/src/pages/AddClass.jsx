import axios from "axios";
import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

function AddClass(){
    const navigateTo = useNavigate();

    const [ageGroup, setAgeGroup] = useState();
    const [classesCounter, setClassesCounter] = useState();
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/classes")
        .then(result => {
            setClasses(result.data); 
            let lock = 0;
            if(result.data.length == 0 && lock == 0){
                lock = 1;
                const ageGroups = ["ז", "ח", "ט", "י", "יא", "יב"];
                setClassesCounter(0);
                ageGroups.map((ageGroup, index) => (
                    axios.post("http://localhost:3000/createClasses", {ageGroup, classesCounter})
                    .then(result => console.log(result))
                    .catch(err => console.log(err))
                ))
                axios.get("http://localhost:3000/classes")
                .then(result => setClasses(result.data))
                .catch(err => console.log(err))
                lock = 0;
            }
        })
        .catch(err => console.log(err))
    }, [classes])
    
    classes.sort(function(a ,b) {return (a.age_group).localeCompare(b.age_group)});
    
    const classesNotInUse = [];
    for(let i = 0 ; i < classes.length ; i++){
        if(classes[i].classes_counter_in_age_group == 0){
            classesNotInUse.push(classes[i]);
        }
    }
    
    const Submit = (e) => {
        e.preventDefault();
        axios.put('http://localhost:3000/updateClass/' + ageGroup, {classesCounter})
        .then(result => {
            console.log(result)
            navigateTo("..") //change to link or חזרה לאב
        })
        .catch(err => console.log(err))
    }
    
    if(classesNotInUse.length > 0){
        return(
            <>
                <form onSubmit={Submit}>
                    <h1>הוספת שכבה חדשה</h1>

                    <div>
                        <label>שכבה</label>
                        <select name="שכבה" id="class" 
                        onChange={(e) => {
                            const selectedIndex = e.target.options.selectedIndex;
                            const selected = e.target.options[selectedIndex].getAttribute('data-key');
                            setAgeGroup(selected);
                        }}
                        required>
                            <option value="">בחר שכבה</option>
                            {classesNotInUse.map((cls, index) => (
                                <option key={cls._id} data-key={cls._id} value={cls.age_group}> 
                                    {cls.age_group}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label>הזן את כמות כיתות בשכבה (בין 1 ל-12)</label>
                        <input type="number" min="1" max="12"
                        onChange={(e) => setClassesCounter(e.target.value)}
                        required/>
                    </div>

                    <button className="submit-button">הוספה</button>
                </form>
            </>
        );
    } else{
        return(
            <>
                <h1>הוספת שכבה חדשה</h1>
                    
                <h3>לא ניתן להוסיף שכבות נוספות</h3>

                <button className="small-button" onClick = {() => navigateTo("..")}>חזרה לרשימת השכבות &gt;&gt;</button>
            </>
        );
    }
}

export default AddClass;