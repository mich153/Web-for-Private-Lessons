import React from 'react'
import Toolbar from '../components/Toolbar';
import { useNavigate } from 'react-router-dom';

function HomeCoordinator() {
    const navigateTo = useNavigate();
    
    return(
        <>
            <Toolbar /> 
            
            <h1>ברוכים הבאים</h1>

            <div className='actions'>
                <button onClick = {() => navigateTo("")}>דו"ח תגבורים במקצוע</button>
                <button onClick = {() => navigateTo("")}>דו"ח נוכחות במקצוע</button>
                <button onClick = {() => navigateTo("")}>קביעת לו"ז לחודש הבא</button>
                <button onClick = {() => navigateTo("")}>דיווח על ביצוע תגבור</button>
                <button onClick = {() => navigateTo("")}>צפייה בלוח תגבורים</button>
                <button onClick = {() => navigateTo("")}>צפייה בחומרי לימוד שהועלו</button>
            </div>
        </>
    );
}

export default HomeCoordinator;