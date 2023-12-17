import React from "react";
import { useNavigate } from "react-router-dom";

function Toolbar(){
    const navigateTo = useNavigate();
    
    return (
        <>
            <div className="tools">
                <img src="/logo.png" alt='logo' width="380" height="100"/>
                <button className = "small-button" onClick = {() => navigateTo("")}>פרופיל</button>
            </div>
        </>
    );
}

export default Toolbar;