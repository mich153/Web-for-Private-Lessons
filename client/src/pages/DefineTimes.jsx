import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function DefineTimes(){
    const navigateTo = useNavigate();
    const [user, setUser] = useState({});
    const [days, setDays] = useState(['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי']);
    const [error, setError] = useState(null);
    const type = window.localStorage.getItem("type");

    useEffect(() => {
        if(type == 'coordinator'){
            axios.get("http://localhost:3000/coordinator/" + window.localStorage.getItem("id"))
            .then(result => {
                setUser(result.data);
            })
            .catch(err => console.log(err))
        } else{
            axios.get("http://localhost:3000/findTeacherByUser/" + window.localStorage.getItem("id"))
            .then(result => {
                setUser(result.data);
            })
            .catch(err => console.log(err))
        }
    })

    function UpdateUser(temp_times){
        let possible_times = temp_times;
        if(type == 'coordinator'){
            axios.put("http://localhost:3000/updateTimesForCoordinator/" + user._id, {possible_times})
            .then(result => navigateTo('..'))
            .catch(err => console.log(err))
        } else{
            axios.put("http://localhost:3000/updateTimesForTeacher/" + user._id, {possible_times})
            .then(result => navigateTo('..'))
            .catch(err => console.log(err))
        }
    }

    function Submit(e){
        e.preventDefault();
        setError(null);
        let temp_times = [];
        days.map((day, index) => {
            let start = document.getElementsByClassName(day + 'start');
            let end = document.getElementsByClassName(day + 'end');
            for(let i = 0; i < start.length; i++){
                let [h_start, m_start] = start[i].value.split(':');
                let [h_end, m_end] = end[i].value.split(':');
                if(!start[i].value && !end[i].value){
                    continue;
                } else if((start[i].value && !end[i].value) || (!start[i].value && end[i].value)){
                    setError('יש מקום בו כתוב שעת התחלה בלי שעת סיום או להפך');
                    temp_times = [];
                    break;
                } else if(h_start == h_end && m_start == m_end){
                    setError('יש מקום בו שעת ההתחלה ושעת הסיום זה אותה השעה');
                    temp_times = [];
                    break;
                } else if(h_start > h_end || (h_start == h_end && m_start > m_end)){
                    setError('יש מקום בו שעת ההתחלה היא אחרי שעת הסיום');
                    temp_times = [];
                    break;
                } else{
                    let temp = temp_times.findIndex(function(time){return time[0] == day});
                    if(temp >= 0){
                        temp_times[temp].push([start[i].value, end[i].value]);
                    } else{
                        temp_times.push([day, [start[i].value, end[i].value]]);
                    }
                }
            }
        });
        if(!error){
            UpdateUser(temp_times);
        }
    }

    return(
        <>
            <h1>קביעת זמנים מתאימים לביצוע לשיעורים</h1>
            <h3>אנא מלא.י את הזמנים הפנויים עבורך לבצע תיגבורים</h3>
            <form onSubmit={Submit}>
                {days.map((day, index) => (
                    <div id={index}>
                        <label>{day}</label>
                        <div id={"input" + index}>
                            <div>
                                מ:
                                <input className={day + 'start'} type="time" 
                                onChange={(e) => setError(null)}/>
                                עד:
                                <input className={day + 'end'} type="time" 
                                onChange={() => setError(null)}/>
                            </div>
                        </div>
                        <button id={'button' + index} className="form-button" onClick={(e) => {
                            e.preventDefault();
                            var parentObj = document.getElementById('input' + index);
                            var childDiv = document.createElement("div");
                            var childInput1 = document.createElement("input");
                            childInput1.type = "time";
                            childInput1.className = day + 'start';
                            childInput1.addEventListener(
                                'change',
                                function() { setError(null) },
                                false
                            );
                            var childInput2 = document.createElement("input");
                            childInput2.type = "time";
                            childInput2.className = day + 'end';
                            childInput2.addEventListener(
                                'change',
                                function() { setError(null) },
                                false
                            );
                            childDiv.innerHTML += 'מ:';
                            childDiv.appendChild(childInput1);
                            childDiv.innerHTML += 'עד:';
                            childDiv.appendChild(childInput2);
                            parentObj.appendChild(childDiv);
                        }}>הוסף עוד</button>
                    </div>
                ))}
                <p className="error">{error}</p>
                <button type="submit" className="submit-button">שמור</button>
            </form>
        </>
    );
}

export default DefineTimes;