import React from 'react'
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

function Admin() {
    const navigateTo = useNavigate();
    
    return(
        <>
            <h1>ברוכים הבאים</h1>

            <div className='actions'>
                <button onClick = {() => navigateTo("students-list")}>רשימת תלמידים</button>
                <button onClick = {() => navigateTo("")}>רשימת מורים</button>
                <button onClick = {() => navigateTo("")}>רשימת מקצועות</button>
                <button onClick = {() => navigateTo("classes")}>רשימת כיתות</button>
            </div>
            
           <Footer />
        </>
    );
}

export default Admin;