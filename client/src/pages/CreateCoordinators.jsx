import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateCoordinators(){
    const navigateTo = useNavigate();

    const [subjects, setSubjects] = useState([]);
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [lessons, setLessons] = useState([]);
    const [major, setMajor] = useState();

    useEffect(() => {
        axios.get("http://localhost:3000/schoolSubjects")
        .then(result => setSubjects(result.data))
        .catch(err => console.log(err))
    }, [subjects])

    function ClickCheckbox(subject, unit){
        if(document.getElementById(subject._id+unit).checked){
            const temp = lessons;
            temp[subject._id] ? 
                temp[subject._id].push(unit): 
                temp[subject._id] = [unit];
            setLessons(temp);
        } else{
            const temp = lessons;
            temp[subject._id] ? 
                temp[subject._id].splice(temp[subject._id].indexOf(unit), 1): 
                delete temp[subject._id];
            Object.keys(temp).forEach(key => {
                if (temp[key] === undefined || temp[key].length == 0) {
                    delete temp[key];
                }
            });
            setLessons(temp);
        }
    }

    function Submit(e){
        e.preventDefault();
        var type = "coordinator";
        axios.post("http://localhost:3000/createUser", {firstName, lastName, type})
        .then(result => {
            var user = result.data;
            var teachingLessons = Object.keys(lessons).map((key) => [key, lessons[key]])
            axios.post("http://localhost:3000/createCoordinators", {user, major, teachingLessons})
            .then(result => navigateTo('..'))
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    }
    
    if(subjects){
        return(
            <>
                <h1>הוספת רכזי/ות מקצוע</h1>

                <form onSubmit={Submit}>
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
                        <label>המקצוע שהוא/היא הרכז/ת שלו</label>
                        <select
                        onChange={(e) => {
                            const selectedIndex = e.target.options.selectedIndex;
                            const selected = e.target.options[selectedIndex].getAttribute('data-key');
                            setMajor(selected);
                        }}
                        required>
                            <option value="">בחר מקצוע</option>
                            {subjects.map((s, i) => (
                                <option key={s._id} data-key={s._id} value={s.name}> 
                                    {s.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>מקצועות לימוד (אין צורך לסמן אם הוא/היא לא מבצע/ת תגבורים)</label>
                        {subjects.map((s, i) => (
                            <ul id={s._id}>
                                <li key={s._id + "name:" + s.name}>{s.name}</li>
                                <ul key={s._id + "list"}>
                                    {s.units.map((u, ind) => (
                                        <div id={s._id + "units:" + String(u)} key={s._id + "units:" + String(u)}>
                                            <input type="checkbox" id={s._id+u} value={u} key={s.name+u}
                                            onClick={()=> ClickCheckbox(s, u)} />
                                            <label htmlFor={s._id+u} >{u} יח"ל</label>
                                        </div>
                                    ))}
                                </ul>
                            </ul>
                        ))}
                    </div>
                    <button className="submit-button">הוספה</button>
                </form>
            </>
        )
    } else{
        return(
            <>
                <h1>הוספת רכזי/ות מקצוע</h1>

                <h3>אין מקצועות לימוד בבית הספר שניתן לשייך אליהם רכזי/ות מקצוע</h3>
            </>
        )
    }
}

export default CreateCoordinators;