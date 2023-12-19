import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NoAccess from "../pages/NoAccess";

function AuthRequired({admin = null, student = null, teacher = null, coordinator = null}){
    const navigateTo = useNavigate();
    const [userType, setUserType] = useState(null)

    useEffect(() => {
        setUserType(window.localStorage.getItem("type"));
        if(!window.localStorage.getItem("type")){
            window.alert('צריך להתחבר כדי לגשת לדף זה')
            navigateTo("/login")
        }
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