import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Header(){
    const navigateTo = useNavigate();
    const [userID, setUserID] = useState(null)
    const [userType, setUserType] = useState(null)

    useEffect(() => {
        setUserID(window.localStorage.getItem("id"));
        setUserType(window.localStorage.getItem("type"));
    })
    
    function LogOut(e){
        e.preventDefault();
        if(window.localStorage.getItem("id") && window.localStorage.removeItem("type")){
            window.localStorage.removeItem("id");
            window.localStorage.removeItem("type");
        }
        navigateTo('/login');
    }

    if(window.location.pathname == '/login'){
        return(
            <Link to="/"><img src="/logo.png" alt='logo' width="380" height="100"/></Link>
        )
    } else if(userID){
        if(userType == 'admin'){
            return(
                <>
                    <Link to="/"><img src="/logo.png" alt='logo' width="380" height="100"/></Link>
                    <button className = "small-button" onClick = {(e) => LogOut(e)}>התנתקות</button>
                    <button className = "small-button" onClick = {() => navigateTo("/home")}>מסך ראשי</button>
                </>
            )
        }
        return(
            <>
                <Link to="/"><img src="/logo.png" alt='logo' width="380" height="100"/></Link>
                <button className = "small-button" onClick = {(e) => LogOut(e)}>התנתקות</button>
                <button className = "small-button" onClick = {() => navigateTo("/home/profile")}>פרופיל</button>
                <button className = "small-button" onClick = {() => navigateTo("/home")}>מסך ראשי</button>
            </>
        )
    } else{
        return (
            <>
                <Link to="/"><img src="/logo.png" alt='logo' width="380" height="100"/></Link>
                <button className = "small-button" onClick = {() => navigateTo("/login")}>כניסה</button>
            </>
        )
    }
}

export default Header;