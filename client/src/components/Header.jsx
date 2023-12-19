import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Header(){
    const navigateTo = useNavigate();
    const [userID, setUserID] = useState(null)

    useEffect(() => {
        setUserID(window.localStorage.getItem("id"));
    })
    
    if(userID){
        return(
            <>
                <Link to="/"><img src="/logo.png" alt='logo' width="380" height="100"/></Link>
                <button className = "small-button" onClick = {() => navigateTo("")}>התנתקות</button>
                <button className = "small-button" onClick = {() => navigateTo("")}>פרופיל</button>
                <button className = "small-button" onClick = {() => navigateTo("/home")}>מסך ראשי</button>
            </>
        )
    } else{
        return (
            <>
                <img src="/logo.png" alt='logo' width="380" height="100"/>
                <button className = "small-button" onClick = {() => navigateTo("/login")}>כניסה</button>
            </>
        )
    }
}

export default Header;