import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function CreateStudent(){
    const navigateTo = useNavigate();

    const studentID = useParams();
    const [student, setStudent] = useState({id: "", class_number: 0, cls: ""});
    const [user, setUser] = useState({first_name: "", last_name: ""});
    const [classes, setClasses] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [ageGroup, setAgeGroup] = useState("");
    const [classNumber, setClassNumber] = useState();
    const [id, setID] = useState(0);
    var classesCounter;

    useEffect(() => {
        axios.get("http://localhost:3000/classes")
        .then(result => {
            setClasses(result.data);
            axios.get("http://localhost:3000/student/" + studentID.student_id)
            .then(result => {
                setStudent(result.data);
                if(id == 0){
                    setID(result.data.id);
                    setAgeGroup(result.data.cls);
                    setClassNumber(result.data.class_number);
                    let class_options = document.getElementById("class").childNodes;
                    for(let i = 0; i < class_options.length; i++){
                        if(class_options[i].getAttribute("data-key") == result.data.cls){
                            class_options[i].setAttribute("selected", true);
                        }
                    }
                    classesInUse.find(function(cls){return cls._id == result.data.cls})?
                        classesCounter = classesInUse.find(function(cls){return cls._id == result.data.cls}).classes_counter_in_age_group:
                        classesCounter = 0;
                    var droplist = document.getElementById("select-classes-number");
                    while(droplist.options.length) 
                        droplist.options.remove(0);
                    var option = document.createElement("option");
                    option.text = "בחר מספר כיתה";
                    option.value = "";
                    droplist.add(option);
                    for(let i=0 ; i < classesCounter ; i++){
                        option = document.createElement("option");
                        option.text = i+1;
                        option.value = i+1;
                        if(i+1 == result.data.class_number){
                            option.selected = true;
                        }
                        droplist.add(option);
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
        })
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
        axios.put("http://localhost:3000/updateUser/" + user._id, {firstName, lastName})
        .then(result => {
            axios.put("http://localhost:3000/updateStudent/" + student._id, {ageGroup, classNumber, id})
            .then(result => navigateTo(`../${ageGroup}/${classNumber}`))
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    }

    return(
        <>
            <form onSubmit={Submit}>
                <h1>עדכון פרטי תלמיד.ה</h1>

                <div>
                    <label>שם פרטי</label>
                    <input type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required/>
                </div>
                <div>
                    <label>שם משפחה</label>
                    <input type="text" 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required/>
                </div>
                <div>
                    <label>מספר תעודת זהות</label>
                    <input type="number" 
                    value={id}
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
                                    if(i+1 == student.class_number && selected == student.cls){
                                        option.selected = true;
                                    }
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
                <button className="submit-button">עידכון</button>
            </form>
        </>
    )
}

export default CreateStudent;