import React from 'react'
import { useNavigate } from 'react-router-dom';

function HomeStudent() {
    const navigateTo = useNavigate();
    
    return(
        <>
            <h1>ברוכים הבאים</h1>

            <div className='actions'>
                <button onClick = {() => navigateTo("lessons-list")}>צפייה בלוח תגבורים</button>
                <button onClick = {() => navigateTo("")}>צפייה בחומרי לימוד</button>
                <button onClick = {() => navigateTo("registration")}>הרשמה לתגבור</button>
                <button onClick = {() => navigateTo("")}>נוכחות</button>
            </div>
        </>
    );
}

export default HomeStudent;