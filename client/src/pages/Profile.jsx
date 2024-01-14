import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Profile() {
    const navigateTo = useNavigate();
    const [user, setUser] = useState({first_name: '', last_name: ''});
    const [userType, setUserType] = useState(null);
    const [details, setDedails] = useState({lessons: []});
    const [subjects, setSubjects] = useState([]);
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/user/" + window.localStorage.getItem("id"))
        .then(result => {
            setUser(result.data);
            const type = window.localStorage.getItem("type");
            setUserType(type);
            if(type == 'student'){
                axios.get("http://localhost:3000/findStudentByUserID/" + window.localStorage.getItem("id"))
                .then(result => setDedails(result.data))
                .catch(err => console.log(err))
            } else if(type == 'teacher'){
                axios.get("http://localhost:3000/findTeacherByUser/" + window.localStorage.getItem("id"))
                .then(result => setDedails(result.data))
                .catch(err => console.log(err))
            } else{
                axios.get("http://localhost:3000/coordinator/" + window.localStorage.getItem("id"))
                .then(result => setDedails(result.data))
                .catch(err => console.log(err))
            }
        })
        .catch(err => console.log(err))
        axios.get("http://localhost:3000/schoolSubjects")
        .then(result => setSubjects(result.data))
        .catch(err => console.log(err))
        axios.get("http://localhost:3000/classes")
        .then(result => setClasses(result.data))
        .catch(err => console.log(err))
    }, [subjects])

    function findSubject(id){
        let index = subjects.findIndex(function(s){return s._id == id});
        return index == -1? index:  subjects[index].name;
    }

    function findClass(id){
        let index = classes.findIndex(function(c){return c._id == id});
        return index == -1? index:  classes[index].age_group;
    }

    if(userType == 'student'){
        return(
            <>
                <h1>פרופיל אישי</h1>
                <ul>
                    <li className='profile'><span className='profile'>שם:</span> {user.first_name + ' ' + user.last_name}</li>
                    <li className='profile'><span className='profile'>מספר תעודת זהות:</span> {details.id}</li>
                    <li className='profile'><span className='profile'>כיתה:</span> {findClass(details.cls) + details.class_number}</li>
                </ul>
                <button className='form-button'
                onClick={() => navigateTo('/home/change-password')}
                >שינוי סיסמה</button>
            </>
        );
    } else if(userType == 'teacher'){
        return(
            <>
                <h1>פרופיל אישי</h1>
                <ul>
                    <li className='profile'><span className='profile'>שם:</span> {user.first_name + ' ' + user.last_name}</li>
                    <li className='profile'><span className='profile'>מקצועות לימוד:</span> 
                        <ul>
                            {details.lessons.map((l, i) => (
                                l[1].map((unit, index) => (
                                    <li>{findSubject(l[0]) + '- ' + unit + ' יח"ל'}</li>
                                ))
                            ))}
                        </ul>
                    </li>
                </ul>
                <button className='form-button'
                onClick={() => navigateTo('/home/change-password')}
                >שינוי סיסמה</button>
            </>
        );
    } else{
        return(
            <>
                <h1>פרופיל אישי</h1>
                <ul>
                    <li className='profile'><span className='profile'>שם:</span> {user.first_name + ' ' + user.last_name}</li>
                    <li className='profile'><span className='profile'>מקצוע רכזות:</span> {findSubject(details.major)}</li>
                    <li className='profile'><span className='profile'>מקצועות לימוד:</span> 
                        <ul>
                            {details.lessons.map((l, i) => (
                                l[1].map((unit, index) => (
                                    <li>{findSubject(l[0]) + '- ' + unit + ' יח"ל'}</li>
                                ))
                            ))}
                        </ul>
                    </li>
                </ul>
                <button className='form-button'
                onClick={() => navigateTo('/home/change-password')}
                >שינוי סיסמה</button>
            </>
        );
    }
}

export default Profile;