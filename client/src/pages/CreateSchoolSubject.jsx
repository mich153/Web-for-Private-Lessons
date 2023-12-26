import axios from "axios";
import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

function CreateSchoolSubject(){
    const navigateTo = useNavigate();

    const [subjects, setSubjects] = useState([]);
    const [subject, setSubject] = useState();
    const [unitsCount, setUnitsCount] = useState();
    const [units, setUnits] = useState([null, null, null, null, null]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3000/schoolSubjects')
        .then(result => setSubjects(result.data))
        .catch(err => console.log(err))
    }, [subjects])
    
    const Submit = (e) => {
        e.preventDefault();
        let mapped = subjects.map((s, i) => {
            return s.name;
        });
        if(mapped.includes(subject)){
            setError("מקצוע זה כבר קיים במערכת");
        } else if(!validUnits()){
            setError(`יש כמות יח"ל מסוימת שכתובה יותר מפעם אחת`);
        } else{
            const studyUnits = units.slice(0, unitsCount);
            const name = subject;
            axios.post('http://localhost:3000/createSchoolSubject', {name, studyUnits})
            .then(result => navigateTo("../"))
            .catch(err => console.log(err))
        }
    }
    
    function validUnits(){
        for(let i = 0; i < units.length && units[i]; i++){
            if(units.filter(x => x==units[i]).length > 1){
                return false;
            }
        }
        return true;
    }

    function editUnites(value, index){
        const temp = units.map((u, ind) => {
            if(ind == index){
                return value;
            } else{
                return u;
            }
        })
        setUnits(temp);
    }

    return(
        <>
            <form onSubmit={Submit}>
                <h1>הוספת מקצוע לימודי חדש</h1>

                <div>
                    <label>מקצוע</label>
                    <input type="text" placeholder="מקצוע"
                    onChange={(e) => {
                        setSubject(e.target.value.trim());
                        setError(null);
                    }}
                    required />
                </div>

                <div>
                    <label>כמה רמות לימוד יש?</label>
                    <input type="number" min="1" max="5"
                    onChange={(e) => {
                        setUnitsCount(e.target.value);
                        setError(null);
                    }}
                    required />
                </div>

                {Array.from({length: unitsCount}, (_, i) => i + 1).map((i, ind) => (
                    <div key={i}>
                        <label >כמות יח"ל של רמה מס' {i}</label>
                        <input type="number" min="1" max="15"
                        onChange={(e) => {
                            editUnites(e.target.value, ind);
                            setError(null);
                        }}
                        required />
                    </div>
                ))}
                <p className="error">{error}</p>
                <button className="submit-button">הוספה</button>
            </form>
        </>
    )
}

export default CreateSchoolSubject;