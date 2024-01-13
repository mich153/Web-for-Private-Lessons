import axios from "axios";
import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

function SchoolSubjectsList(){
    const navigateTo = useNavigate();
    
    const [subjects, setSubjects] = useState([]);
    const [modal, setModal] = useState(false);
    const [modalError, setModalError] = useState(null);
    const [studyUnit, setStudyUnit] = useState(null);
    const [subject, setSubject] = useState(null);

    const toggleModal = () => {
      setModal(!modal);
    };
  
    if(modal) {
      document.body.classList.add('active-modal')
    } else {
      document.body.classList.remove('active-modal')
    }
  
    useEffect(() => {
        axios.get('http://localhost:3000/schoolSubjects')
        .then(result => setSubjects(result.data))
        .catch(err => console.log(err))
    }, [subjects])

    subjects.sort(function(a,b) {return (a.name).localeCompare(b.name)})
    for(let i = 0; i < subjects.length; i++){
        subjects[i].units.sort();
    }

    const UpdateUnits = (indexSubject, indexUnit, number) => {
        const units = subjects[indexSubject].units;
        units[indexUnit] = number;
        axios.put('http://localhost:3000/updateUnits/' + subjects[indexSubject]._id, {units})
        .then(result => console.log(result))
        .catch(err => console.log(err))
    }

    const DeleteUnit = (indexSubject, indexUnit) => {
        const units = subjects[indexSubject].units;
        units.splice(indexUnit, 1);
        axios.put('http://localhost:3000/updateUnits/' + subjects[indexSubject]._id, {units})
        .then(result => console.log(result))
        .catch(err => console.log(err))
    }

    const Submit = (e) => {
        e.preventDefault();
        if(subject.units.includes(Number(studyUnit))){
            setModalError(`כבר קיימת כמות כזאת של יח"ל במקצוע זה`);
        } else{
            subject.units.push(Number(studyUnit));
            const units = subject.units;
            axios.put('http://localhost:3000/updateUnits/' + subject._id, {units})
            .then(result => toggleModal())
            .catch(err => console.log(err))
        }
    }

    const Delete = (indexSubject) =>{
        axios.delete('http://localhost:3000/deleteSchoolSubject/' + subjects[indexSubject]._id)
        .then(result => console.log(result))
        .catch(err => console.log(err))
    }

    if(subjects.length > 0){
        return(
            <>
                <h1>רשימת מקצועות לימוד</h1>

                <button className="form-button" onClick = {() => navigateTo("new")}>הוספת מקצוע</button>
                
                <table>
                    <thead>
                        <tr>
                            <th className="index-column"></th>
                            <th>מקצוע</th>
                            <th>כמות יח"ל</th>
                            <th>פעולות</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subjects.map((s, ind) => (
                            <tr key={ind}>
                                <td className="index-column">{ind + 1}</td>
                                <td>{s.name}</td>
                                <td>
                                    {s.units.map((u, i) => (
                                        <dl key={s.name+i}>
                                            <dt>
                                                <button className="form-button"
                                                onClick={(e) => {
                                                    if(s.units.includes(u+1)){
                                                        document.getElementById(`${s.name+i}`).innerHTML = `כבר יש כמות כזו של יח"ל במקצוע זה`;
                                                        document.getElementById(`${s.name+i}`).style.padding = "10px";
                                                    } else if(u + 1 > 15){
                                                        document.getElementById(`${s.name+i}`).innerHTML = `לא ניתן לבצע פעולה זו`;
                                                        document.getElementById(`${s.name+i}`).style.padding = "10px";
                                                    } else{
                                                        document.getElementById(`${s.name+i}`).innerHTML = ``;
                                                        document.getElementById(`${s.name+i}`).style.padding = "0px";
                                                        UpdateUnits(ind, i, u+1);
                                                    }
                                                }}>+</button>
                                                {u}
                                                <button className="form-button"
                                                onClick={(e) => {
                                                    if(s.units.includes(u-1)){
                                                        document.getElementById(`${s.name+i}`).innerHTML = `כבר יש כמות כזו של יח"ל במקצוע זה`;
                                                        document.getElementById(`${s.name+i}`).style.padding = "10px";
                                                    } else if(u - 1 < 1){
                                                        document.getElementById(`${s.name+i}`).innerHTML = `לא ניתן לבצע פעולה זו`;
                                                        document.getElementById(`${s.name+i}`).style.padding = "10px";
                                                    } else{
                                                        document.getElementById(`${s.name+i}`).innerHTML = ``;
                                                        document.getElementById(`${s.name+i}`).style.padding = "0px";
                                                        UpdateUnits(ind, i, u-1);
                                                    }
                                                }}>-</button>
                                                <button className="form-button"
                                                onClick={(e) => {
                                                    if(s.units.length == 1){
                                                        document.getElementById(`${s.name+i}`).innerHTML = `זוהי רמת הלימוד היחידה במקצוע זה.\n כדי למחוק את המקצוע לחץ על הכפתור "מחיקה" שבטור השמאלי בטבלה.`;
                                                        document.getElementById(`${s.name+i}`).style.padding = "10px";
                                                    } else{
                                                        document.getElementById(`${s.name+i}`).innerHTML = ``;
                                                        document.getElementById(`${s.name+i}`).style.padding = "0px";
                                                        DeleteUnit(ind, i);
                                                    }
                                                }}>הסרה</button>
                                            </dt>
                                            <p className="error" id={`${s.name+i}`}></p>
                                        </dl>
                                    ))}
                                </td>
                                <td>
                                    <button className="form-button"
                                    onClick={() => Delete(ind)}
                                    >מחיקה</button>
                                    <button className="form-button"
                                    onClick={(e) => {
                                        setSubject(s);
                                        toggleModal();
                                    }}>הוספת רמת לימוד</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {modal && (
                    <div className="modal">
                        <div onClick={toggleModal} className="overlay"></div>
                        <div className="modal-content">
                            <form onSubmit={Submit}>
                                <label>כמה יח"ל?</label>
                                <input
                                type="number" min="1" max="15"
                                onChange={(e) => {
                                    setStudyUnit(e.target.value)
                                    setModalError(null);
                                }}
                                required />
                                <p className="error" id="modal-error">{modalError}</p>
                                <button className="small-button" onClick={() => toggleModal()}>ביטול</button>
                                <button type="submit" className="submit-btn-modal submit-button">הוספה</button>
                            </form>
                        </div>
                    </div>
                )}
            </>
        )
    } else{
        return(
            <>
                <h1>רשימת מקצועות לימוד</h1>

                <button className="form-button" onClick = {() => navigateTo("new")}>הוספת מקצוע</button>
                
                <h3>אין מקצועות לימוד להצגה</h3>
            </>
        )
    }
}

export default SchoolSubjectsList;