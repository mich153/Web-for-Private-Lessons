import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NoAccess from "../pages/NoAccess";

function AuthRequired({admin = null, student = null, teacher = null, coordinator = null}){
    let userType = null;
    const navigateTo = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3000/dashboard")
        .then(res => {
            if(!res.data.valid){
                window.localStorage.clear();
            }
            userType = window.localStorage.getItem("type");
            if(!userType){
                window.onload = function(){alert('צריך להתחבר כדי לגשת לדף זה')}
                navigateTo("/login")
            }
        })
        .catch(err => console.log(err))
    })

    if(userType == 'admin' && admin){
        return admin
    } else if(userType == 'student' && student){
        return student
    } else if(userType == 'teacher' && teacher){
        return teacher
    } else if(userType == 'coordinator' && coordinator){
        return coordinator
    } else{
        return <NoAccess />
    }
}

export default AuthRequired;