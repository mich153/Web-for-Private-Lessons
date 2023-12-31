import React from 'react'
import { useNavigate } from 'react-router-dom';

function HomeTeacher() {
    const navigateTo = useNavigate();
    
    return(
        <>
            <h1>ברוכים הבאים</h1>

            <div className='actions'>
                <button onClick = {() => navigateTo("possible-times")}>קביעת לו"ז לחודש הבא</button>
                <button onClick = {() => navigateTo("")}>דיווח על ביצוע תגבור</button>
                <button onClick = {() => navigateTo("")}>צפייה בלוח תגבורים</button>
                <button onClick = {() => navigateTo("")}>צפייה בחומרי לימוד שהועלו</button>
            </div>
        </>
    );
}

export default HomeTeacher;