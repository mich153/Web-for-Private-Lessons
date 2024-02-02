import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function UpdateCoordinator(){
    const navigateTo = useNavigate();

    const coordinatorID = useParams();
    const [coordinator, setCoordinator] = useState([]);
    const [user, setUser] = useState({})
    const [subjects, setSubjects] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [lessons, setLessons] = useState([]);
    const [major, setMajor] = useState("");

    useEffect(() => {
        axios.get("http://localhost:3000/coordinatorByID/" + coordinatorID.coordinator_id)
        .then(result => {
            setCoordinator(result.data);
            const l = result.data.lessons.reduce(function(obj, v) {
                obj[v[0]] = v[1];
                return obj;
              }, {})
            if(!lessons || lessons.length == 0){
              setLessons(l);
            }
            if(!major || major.length == 0){
                setMajor(result.data.major);
                let major_options = document.getElementById("major").childNodes;
                for(let i = 0; i < major_options.length; i++){
                    if(major_options[i].getAttribute("data-key") == result.data.major){
                        major_options[i].setAttribute("selected", true);
                        break;
                    }
                }
            }
            axios.get("http://localhost:3000/user/" + result.data.user)
                .then(result => {
                    setUser(result.data);
                    if(firstName == ""){
                        setFirstName(result.data.first_name);
                        setLastName(result.data.last_name);
                    }
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
        axios.get("http://localhost:3000/schoolSubjects")
        .then(result => setSubjects(result.data))
        .catch(err => console.log(err))
    }, [subjects])

    function ClickCheckbox(subject, unit){
        if(document.getElementById(subject._id+unit).checked){
            const temp = lessons;
            temp[subject._id] && !temp[subject._id].includes(unit) ? 
                temp[subject._id].push(unit): 
                temp[subject._id] = [unit];
            setLessons(temp);
        } else{
            const temp = lessons;
            if(temp[subject._id] && temp[subject._id].includes(unit))
                temp[subject._id].splice(temp[subject._id].indexOf(unit), 1);
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
        axios.put("http://localhost:3000/updateUser/" + user._id, {firstName, lastName})
        .then(result => {
            var teachingLessons = Object.keys(lessons).map((key) => [key, lessons[key]])
            axios.put("http://localhost:3000/updateCoordinator/" + coordinator._id, {teachingLessons, major})
            .then(result => navigateTo(`..`))
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    }
    
    if(subjects){
        return(
            <>
                <h1>עדכון פרטי רכז.ת</h1>

                <form onSubmit={Submit}>
                    <div>
                        <label>שם פרטי</label>
                        <input type="text" placeholder="שם פרטי"
                        value={firstName} 
                        onChange={(e) => setFirstName(e.target.value)}
                        required/>
                    </div>
                    <div>
                        <label>שם משפחה</label>
                        <input type="text" placeholder="שם משפחה" 
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required/>
                    </div>
                    <div>
                        <label>המקצוע שהוא/היא הרכז/ת שלו</label>
                        <select id='major'
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
                        <label>מקצועות לימוד</label>
                        {subjects.map((s, i) => (
                            <ul id={s._id}>
                                <li key={s._id + "name:" + s.name}>{s.name}</li>
                                <ul key={s._id + "list"}>
                                    {s.units.map((u, ind) => (
                                        <div id={s._id + "units:" + String(u)} key={s._id + "units:" + String(u)}>
                                            <input type="checkbox" id={s._id+u} value={u} key={s.name+u}
                                            defaultChecked={Object.keys(lessons).includes(s._id) && lessons[s._id].includes(u)}
                                            onClick={()=> ClickCheckbox(s, u)} />
                                            <label htmlFor={s._id+u} >{u} יח"ל</label>
                                        </div>
                                    ))}
                                </ul>
                            </ul>
                        ))}
                    </div>
                    <button className="submit-button">עידכון</button>
                </form>
            </>
        )
    } else{
        return(
            <>
                <h1>עדכון פרטי רכז.ת</h1>

                <h3>אין מקצועות לימוד בבית הספר שניתן לשייך אליהם רכזים.ות</h3>
            </>
        )
    }
}

export default UpdateCoordinator;