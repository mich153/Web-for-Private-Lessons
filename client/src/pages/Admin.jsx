import React from 'react'
import { useNavigate } from 'react-router-dom';

function Admin() {
    const navigateTo = useNavigate();
    
    return(
        <>
            <h1>ברוכים הבאים</h1>

            <div className='actions'>
                <button onClick = {() => navigateTo("students-list")}>רשימת תלמידים</button>
                <button onClick = {() => navigateTo("teachers-list")}>רשימת מורים</button>
                <button onClick = {() => navigateTo("coordinators-list")}>רשימת רכזי מקצוע</button>
                <button onClick = {() => navigateTo("classes")}>רשימת כיתות</button>
                <button onClick = {() => navigateTo("school-subjects")}>רשימת מקצועות לימוד</button>
            </div>
        </>
    );
}

export default Admin;