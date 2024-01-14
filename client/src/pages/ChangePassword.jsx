import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ChangePassword() {
    const navigateTo = useNavigate();
    const [user, setUser] = useState();
    const [error, setError] = useState(null);
    const [current, setCurrent] = useState(null);
    const [new1, setNew1] = useState(null);
    const [new2, setNew2] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:3000/user/" + window.localStorage.getItem("id"))
        .then(result => {
            setUser(result.data);
        })
        .catch(err => console.log(err))
    })

    const Submit = (e) => {
        e.preventDefault(); 
        if(current != user.password){
            setError('בחלק של הסיסמה הנוכחית הזנת סיסמה שגויה');
        } else if(new1 != new2){
            setError('הסיסמאות החדשות לא תואמות אחת את השניה');
        } else{
            const newPassword = new1;
            axios.put("http://localhost:3000/changePassword/" + window.localStorage.getItem("id"), {newPassword})
            .then(res => navigateTo('../profile'))
            .catch(err => console.log(err))
        }
    }

    return(
        <>
            <h1>שינוי סיסמה</h1>
            <form onSubmit={Submit}>
                <label>סיסמה נוכחית</label>
                <input type="text" placeholder="סיסמה" 
                onChange={(e) => {
                    setCurrent(e.target.value);
                    setError(null)
                }}
                required/>
                <label>סיסמה חדשה</label>
                <input type="password" placeholder="סיסמה"
                minLength={6} maxLength={12}
                onChange={(e) => {
                    setNew1(e.target.value);
                    setError(null)
                }}
                required/>
                <label>נא להזין את הסיסמה החדשה פעם נוספת</label>
                <input type="password" placeholder="סיסמה"
                minLength={6} maxLength={12}
                onChange={(e) => {
                    setNew2(e.target.value);
                    setError(null)
                }}
                required/>
                <p className="error">{error}</p>
                <button className="submit-button">שינוי</button>
            </form>
        </>
    )
}

export default ChangePassword;