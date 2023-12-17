import React from 'react'
import Toolbar from '../components/Toolbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

function HomeTeacher() {
    const navigateTo = useNavigate();
    
    return(
        <>
            <Toolbar />

            <h1>ברוכים הבאים</h1>

            <div className='actions'>
                <button onClick = {() => navigateTo("")}>קביעת לו"ז לחודש הבא</button>
                <button onClick = {() => navigateTo("")}>דיווח על ביצוע תגבור</button>
                <button onClick = {() => navigateTo("")}>צפייה בלוח תגבורים</button>
                <button onClick = {() => navigateTo("")}>צפייה בחומרי לימוד שהועלו</button>
            </div>
            
           <Footer />
        </>
    );
}

export default HomeTeacher;