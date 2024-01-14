import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function HomeCoordinator() {
    const navigateTo = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:3000/coordinator/" + window.localStorage.getItem("id"))
        .then(result => setUser(result.data))
        .catch(err => console.log(err))
    })
    return(
        <>
            <h1>ברוכים הבאים</h1>

            <div className='actions'>
                <button onClick = {() => navigateTo("teachers-list/" + user.major)}>מתגברים.ות במקצוע</button>
                <button onClick = {() => navigateTo("students-list")}>נוכחות לפי כיתות</button>
                <button onClick = {() => navigateTo("possible-times")}>קביעת לו"ז</button>
                <button onClick = {() => navigateTo("")}>דיווח על ביצוע תגבור</button>
                <button onClick = {() => navigateTo("lessons-list")}>לוח תגבורים</button>
                <button onClick = {() => navigateTo("")}>צפייה בחומרי לימוד שהועלו</button>
            </div>
        </>
    );
}

export default HomeCoordinator;