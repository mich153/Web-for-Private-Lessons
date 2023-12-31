import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function PossibleTimes(){
    const navigateTo = useNavigate();
    const [user, setUser] = useState({});
    const [days, setDays] = useState(['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי']);
    const [times, setTimes] = useState([]);
    const type = window.localStorage.getItem("type");

    useEffect(() => {
        if(type == 'coordinator'){
            axios.get("http://localhost:3000/coordinator/" + window.localStorage.getItem("id"))
            .then(result => {
                setUser(result.data);
                setTimes(result.data.possible_times);
            })
            .catch(err => console.log(err))
        } else{
            axios.get("http://localhost:3000/findTeacherByUser/" + window.localStorage.getItem("id"))
            .then(result => {
                setUser(result.data);
                setTimes(result.data.possible_times);
            })
            .catch(err => console.log(err))
        }
    })

    function printTimes(day){
        let i = times.findIndex(function(time){return time[0] == day})
        if(i >= 0){
            
            return(
                <td id={i}>
                    <ul>
                        {times[i].slice(1).map((time, ind) => (
                            <li>{time[0] + '-' + time[1]}</li>
                        ))}
                    </ul>
                </td>
            )
        } else{
            return (<td id={i}></td>)
        }
    }

    return(
        <>
            <h1>לו"ז נוכחי</h1>
            <button className="form-button" onClick = {() => navigateTo("set-times")}>שינוי</button>
            <table>
                <thead>
                    <tr>
                        {days.map((day, index) => (<th id={day}>{day}</th>))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {days.map((day, index) => (
                            printTimes(day)
                        ))}
                    </tr>
                </tbody>
            </table>
        </>
    );
}

export default PossibleTimes;