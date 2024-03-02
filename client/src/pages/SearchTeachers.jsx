import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SearchTeachers(){
    const navigateTo = useNavigate();
    const [subjects, setSubjects] = useState([]);
    const [subject, setSubject] = useState(null);
    const [unit, setUnit] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:3000/schoolSubjects")
        .then(result => setSubjects(result.data))
        .catch(err => console.log(err))
    }, [subjects])

    const Submit = (e) => {
        e.preventDefault();
        navigateTo(`${subject}/${unit}`);
    }

    return(
        <>
            <h1>חיפוש לפי מקצוע</h1>
            <h3>בחר את המקצוע שבו ברצונך לקבל בו עזרה</h3>
            <form onSubmit={Submit}>
                <div>
                    <label>מקצוע</label>
                    <select
                    onChange={(e) => {
                        const selectedIndex = e.target.options.selectedIndex;
                        const selected = e.target.options[selectedIndex].getAttribute('data-key');
                        let [s, unit] = selected.split(' unitNum:');
                        setSubject(s);
                        setUnit(unit);
                    }}
                    required>
                        <option value="">בחר.י מקצוע</option>
                        {subjects.map((s, i) => (
                            s.units.map((unit, index) => (
                                <option key={s._id + " unitNum:" + unit} data-key={s._id + " unitNum:" + unit} value={s._id + " unitNum:" + unit}>
                                    {s.name + "- " + unit + ` יח"ל`}
                                </option>
                            ))
                        ))}
                    </select>
                </div>
                <button type="submit" className="submit-button">חפש</button>
            </form>
        </>
    )
   
}

export default SearchTeachers;