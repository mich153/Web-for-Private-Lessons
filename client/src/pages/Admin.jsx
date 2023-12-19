import React from 'react'
import { useNavigate } from 'react-router-dom';

function Admin() {
    const navigateTo = useNavigate();
    
    return(
        <>
            <h1>ברוכים הבאים</h1>

            <div className='actions'>
                <button onClick = {() => navigateTo("students-list")}>רשימת תלמידים</button>
                <button onClick = {() => navigateTo("")}>רשימת מורים</button>
                <button onClick = {() => navigateTo("")}>רשימת רכזי מקצוע</button>
                <button onClick = {() => navigateTo("classes")}>רשימת כיתות</button>
                <button onClick = {() => navigateTo("")}>רשימת מקצועות לימוד</button>
            </div>
        </>
    );
}

export default Admin;