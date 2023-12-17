import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function LogIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigateTo = useNavigate();
    
    axios.defaults.withCredentials = true;
    const Submit = (e) => {
        e.preventDefault(); 
        axios.post("http://localhost:3000/login", {username, password})
        .then(result => {
            if(result.data.Login){
                setError(null);
                window.localStorage.setItem("id", result.data.id);
                window.localStorage.setItem("type", result.data.type);
                navigateTo("/home")
            } else{
                setError("אחד או יותר מהפרטים שהזנת שגוי");
            }
        })
        .catch(err => {
            setError("התרחשה תקלה, אנא נסו שנית מאוחר יותר");
        })
    };
    
    function showPassword(){
        let btn = document.getElementById('password');
        if(btn.type === 'password'){
            btn.type = 'text';
        } else{
            btn.type = 'password';
        }
    }

    return(
        <>
            <h1>התחברות</h1>
            <form onSubmit={Submit}>
                <div>
                    <label>שם משתמש</label>
                    <input type="text" placeholder="שם משתמש" 
                    onChange={(e) => {
                        setUsername(e.target.value);
                        setError(null);
                    }}
                    required/>
                </div>
                <div>
                    <label>סיסמה</label>
                    <input type="password" placeholder="סיסמה" 
                    id='password'
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setError(null)
                    }}
                    required/>
                    <label className='checkbox'>
                        <input type="checkbox" name='show_psw' onClick={()=>showPassword()} />
                        הצג סיסמה
                    </label>
                </div>
                <p className="error">{error}</p>
                <button className="submit-button">כניסה</button>
            </form>
            <Footer />
        </>
    );
}

export default LogIn;