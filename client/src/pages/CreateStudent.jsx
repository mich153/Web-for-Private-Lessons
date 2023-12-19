import React, { useEffect, useState } from "react";
import axios from "axios";
import './LogIn.css'
import { useNavigate } from "react-router-dom";


function CreateStudent(){
    const navigateTo = useNavigate();

    const [classes, setClasses] = useState([]);
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [ageGroup, setAgeGroup] = useState();
    const [classNumber, setClassNumber] = useState();
    const [id, setID] = useState();
    var classesCounter;

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

    const Submit = (e) => {
        e.preventDefault();
        var type = "student";
        axios.post("http://localhost:3000/createUser", {firstName, lastName, type})
        .then(result => {
            var user = result.data;
            axios.post("http://localhost:3000/createStudent", {user, ageGroup, classNumber, id})
            navigateTo(`../${ageGroup}/${classNumber}`)
        })
        .catch(err => console.log(err))
    }
 
    if(classesInUse.length > 0){
        return(
            <>
                <form onSubmit={Submit}>
                    <h1>הוספת תלמיד.ה חדש.ה</h1>

                    <div>
                        <label>שם פרטי</label>
                        <input type="text" placeholder="שם פרטי" 
                        onChange={(e) => setFirstName(e.target.value)}
                        required/>
                    </div>
                    <div>
                        <label>שם משפחה</label>
                        <input type="text" placeholder="שם משפחה" 
                        onChange={(e) => setLastName(e.target.value)}
                        required/>
                    </div>
                    <div>
                        <label>מספר תעודת זהות</label>
                        <input type="number" placeholder="מספר ת.ז"
                        min="200000000" max="400000000"
                        onChange={(e) => setID(e.target.value)}
                        required/>
                    </div>
                    <div>
                        <label>שכבה</label>
                        <select name="שכבה" id="class"
                        onChange={(e) => {
                            const selectedIndex = e.target.options.selectedIndex;
                            const selected = e.target.options[selectedIndex].getAttribute('data-key');
                            setAgeGroup(selected);
                            for(let i = 0 ; i < classesInUse.length ; i++){
                                if(classesInUse[i]._id == selected){
                                    classesCounter = classesInUse[i].classes_counter_in_age_group;
                                    var droplist = document.getElementById("select-classes-number");
                                    while(droplist.options.length) 
                                        droplist.options.remove(0);
                                    var option = document.createElement("option");
                                    option.text = "בחר מספר כיתה";
                                    option.value = "";
                                    droplist.add(option);
                                    for(let i=0 ; i<classesCounter ; i++){
                                        option = document.createElement("option");
                                        option.text = i+1;
                                        option.value = i+1;
                                        droplist.add(option);
                                    }
                                }
                            }
                        }}
                        required>
                            <option value="">בחר שכבה</option>
                            {classesInUse.map((cls, index) => (
                                <option key={cls._id} data-key={cls._id} value={cls.age_group}> 
                                    {cls.age_group}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div id="classes-number">
                        <label>מספר כיתה</label>
                            <select name="מספר כיתה" id="select-classes-number"
                            onChange={(e) => {
                                setClassNumber(e.target.options.selectedIndex);
                            }}
                            required>
                                <option value="">בחר.י מספר כיתה</option>
                            </select>
                    </div>
                    
                    <button className="submit-button">הוספה</button>
                </form>
            </>
        )
    }else{
        return(
            <>
                <h1>הוספת תלמיד.ה חדש.ה</h1>
                
                <h3>לא קיימות כיתות שניתן להוסיף אליהן תלמידים.ות</h3>
            </>
        )
    }
}

export default CreateStudent;