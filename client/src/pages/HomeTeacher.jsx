import React from 'react'
import { useNavigate } from 'react-router-dom';

function HomeTeacher() {
    const navigateTo = useNavigate();
    
    return(
        <>
            <h1>ברוכים הבאים</h1>

            <div className='actions'>
                <button onClick = {() => navigateTo("lessons-list")}>צפייה בלוח תגבורים</button>
                <button onClick = {() => navigateTo("report")}>דיווח על ביצוע תגבור</button>
                <button onClick = {() => navigateTo("possible-times")}>קביעת לו"ז חדש</button>
            </div>
        </>
    );
}

export default HomeTeacher;