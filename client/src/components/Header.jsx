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
    
    function LogOut(){
        axios.get("http://localhost:3000/logout")
        .then(result => {
            window.localStorage.removeItem("id");
            window.localStorage.removeItem("type");
            window.location.reload()
        })
        .catch(err => console.log(err))
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
                    <button className = "small-button" onClick = {() => LogOut()}>התנתקות</button>
                    <button className = "small-button" onClick = {() => navigateTo("/home")}>מסך ראשי</button>
                </>
            )
        }
        return(
            <>
                <Link to="/"><img src="/logo.png" alt='logo' width="380" height="100"/></Link>
                <button className = "small-button" onClick = {() => LogOut()}>התנתקות</button>
                <button className = "small-button" onClick = {() => navigateTo("")}>פרופיל</button>
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