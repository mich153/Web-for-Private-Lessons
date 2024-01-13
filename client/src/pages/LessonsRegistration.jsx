import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function LessonsRegistration(){
    const navigateTo = useNavigate();
    const {subject_id, unit} = useParams();
    const [user, setUser] = useState(null);
    const [modal, setModal] = useState(false);
    const [modalError, setModalError] = useState(null);
    const [teachers, setTeachers] = useState([]);
    const [users, setUsers] = useState([]);
    const [lessons, setLessons] = useState([]);
    const [days, setDays] = useState(['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי']);
    const [minStart, setMinStart] = useState("");
    const [maxEnd, setMaxEnd] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [day, setDay] = useState("");
    const [teacher, setTeacher] = useState("");
    
    useEffect(() => {
        axios.get("http://localhost:3000/findStudentByUserID/" + window.localStorage.getItem("id"))
        .then(result => setUser(result.data))
        .catch(err => console.log(err))
        axios.get("http://localhost:3000/users/teacher")
        .then(result => {
            axios.get("http://localhost:3000/users/coordinator")
            .then(res => {
                setUsers([...result.data, ...res.data])
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
        axios.get("http://localhost:3000/teachers")
        .then(result => {
            let temp = [];
            result.data.map((t, i) => {
                if(t.lessons.findIndex(function(a){return a[0] == subject_id && a[1].includes(Number(unit))}) != -1){
                    temp.push(t);
                }
            })
            axios.get("http://localhost:3000/coordinators")
            .then(res => {
                res.data.map((c, i) => {
                    if(c.lessons.findIndex(function(a){return a[0] == subject_id && a[1].includes(Number(unit))}) != -1){
                        temp.push(c);
                    }
                }) 
                setTeachers(temp);
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
        axios.get("http://localhost:3000/lessons")
        .then(result => setLessons(result.data))
        .catch(err => console.log(err))
    }, [teachers])

    const toggleModal = () => {
        setModal(!modal);
    }
    if(modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    function Submit(e){
        e.preventDefault();
        let error = false;
        let [h_start, m_start] = start.split(':');
        let [h_end, m_end] = end.split(':');
        if(h_start > h_end){
            setModalError('שעת ההתחלה לא יכולה להיות אחרי שעת הסיום');
            error = true;
        } if(h_start == h_end){
            if(Number(m_end) == Number(m_start)){
                setModalError('שעת ההתחלה ושעת הסיום לא יכולות להיות זהות');
                error = true;
            } else if(m_start > m_end){
                setModalError('שעת ההתחלה לא יכולה להיות אחרי שעת הסיום');
                error = true;
            }
        }
        if(!error){
            const student = user._id;
            axios.post('http://localhost:3000/createLessson', {teacher, student, day, start, end, subject_id, unit})
            .then(res => {
                console.log(res.data); //navigate to the loeesons list
                toggleModal();
            })
            .catch(err => console.log(err))
        }
    }
    
    function findUser(id){
        for(var i = 0; i < users.length; i++)
            if(id == users[i]._id)
                return users[i].first_name + ' ' + users[i].last_name
    }

    function printTimes(day){
        let lessonsInDay = lessons.filter(function(a){return a.day == day});
        for(let i = 0; i < teachers.length; i++){
            if(teachers[i].possible_times){
                let index = teachers[i].possible_times.findIndex(function(a){return a[0] == day})
                if(index != -1){
                    teachers[i].possible_times[index].slice(1).map((time, ind) => {
                        let teacherLessons = lessonsInDay.filter(function(a){return a.time_start >= time[0] && a.time_end <= time[1]});
                        if(teacherLessons.length > 0){
                            teachers[i].possible_times[index].splice(ind + 1, 1);
                        }
                        teacherLessons.sort(function(a, b){return a.time_start.localeCompare(b.time_start)});
                        teacherLessons.map((l, indx) => {
                            let [h_freeStart, m_freeStart] = time[0].split(':');
                            let [h_freeEnd, m_freeEnd] = time[1].split(':');
                            let [h_LessonStart, m_LessonStart] = l.time_start.split(':');
                            let [h_LessonEnd, m_LessonEnd] = l.time_end.split(':');
                            if(h_LessonStart - h_freeStart == 1 && m_freeStart - m_LessonStart > 40){ //the sub is less than 20 min
                                null //jump over
                            } else if(h_LessonStart - h_freeStart > 0 || m_LessonStart - m_freeStart >= 20 ){ //the sub is higher than 20 min
                                teachers[i].possible_times[index].push([time[0], l.time_start]);
                            }
                            if(indx == teacherLessons.length  - 1 && (h_freeEnd - h_LessonEnd > 0 || m_freeEnd - m_LessonEnd >= 20)){
                                teachers[i].possible_times[index].findIndex(function(a){return a[1] == time[1]}) != -1?
                                    null:
                                    teachers[i].possible_times[index].push([l.time_end, time[1]]);
                            }
                            time[0] = l.time_end;
                        });
                    });
                    const name = findUser(teachers[i].user);
                    return <><ins><b>{name}</b></ins>
                    <ul>
                        {teachers[i].possible_times[index].slice(1).sort(function(a, b){return a[0].localeCompare(b[0])}).map((time, ind) => (
                            <li>
                                {time[0] + '-' + time[1]} 
                                <button className='form-button'
                                onClick={() => {
                                    setMinStart(time[0]);
                                    setMaxEnd(time[1]);
                                    setDay(day);
                                    setTeacher(teachers[i]._id);
                                    toggleModal();
                                }}>בחירה</button>
                            </li>
                        ))}
                    </ul>
                    </>
                }
            }
        }
    }
    
    return(
        <>
            <h1>בחירה לפי היצע התגבורים</h1>
            <table>
                <thead>
                    <tr>
                        {days.map((day, index) => (<th id={day}>{day}</th>))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {days.map((day, index) => (
                            <td>{printTimes(day)}</td>
                        ))}
                    </tr>
                </tbody>
            </table>
            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                        <h1>קביעת שיעור</h1>
                        <h4>בחר.י את זמן הרצוי לשיעור בין השעות {minStart} ל-{maxEnd} ביום {day}</h4>
                        <form onSubmit={Submit}>
                            <label>זמן התחלה</label>
                            <input className={day + 'start'} type="time" 
                            min={minStart} max={maxEnd}
                            onChange={(e) => {
                                setModalError(null);
                                setStart(e.target.value);
                            }}
                            required />
                            <label>זמן סיום</label>
                            <input className={day + 'start'} type="time" 
                            min={minStart} max={maxEnd}
                            onChange={(e) => {
                                setModalError(null);
                                setEnd(e.target.value);
                            }}
                            required />
                            <p className="error" id="modal-error">{modalError}</p>
                            <button className="small-button" onClick={() => toggleModal()}>ביטול</button>
                            <button type="submit" className="submit-btn-modal submit-button">קביעה</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default LessonsRegistration;