import axios from "axios";
import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

var first = true; //used to check if it is the first time, to disable that "React.StrictMode" would make the table in the second time

function ClassesNavigate(){    
    const navigateTo = useNavigate();

    const [needToMakeTable, setNeedToMakeTable] = useState(false);
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/classes")
        .then(result => setClasses(result.data))
        .catch(err => console.log(err))
    }, [classes])
    
    classes.sort(function(a ,b) {return (a.age_group).localeCompare(b.age_group)});
    
    const classesInUse = [];
    let maxClassesCounter = 0; //the maximum counter is the count of the rows in the table
    for(let i = 0 ; i < classes.length ; i++){
        if(classes[i].classes_counter_in_age_group > 0){
            if(maxClassesCounter < classes[i].classes_counter_in_age_group){
                maxClassesCounter = classes[i].classes_counter_in_age_group
            }
            classesInUse.push(classes[i]);
        }
    }

    const Button = (cls, num) => {
        if(num <= cls.classes_counter_in_age_group){
            return(<td key={cls.age_group + num}>
                <button className="form-button" 
                onClick = {() => {console.log(cls, num);
                navigateTo(`${cls._id}/${num}`)
                }}>
                    {cls.age_group + num}
                </button>
            </td>)
        } else{
            return(<td key={cls.age_group + num}></td>)
        }
    }

    if(classesInUse.length > 0){
        if(needToMakeTable == false)
            setNeedToMakeTable(true);
        return(
            <>
                <h3>בחר.י כיתה כדי לראות את רשימת התלמידים.ות הלומדים.ות בה</h3>
                
                <table>
                    <tbody>
                        {[...Array(maxClassesCounter).keys()].map((i, ind) => (
                            <tr key={i+1}>
                                {classesInUse.map((cls, index) => (
                                    Button(cls, i+1)
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>
        );
    } 
    else{
        return(
            <>
                <h3>בחר.י כיתה כדי לראות את רשימת התלמידים.ות הלומדים.ות בה</h3>
                
                <h3>אין שכבות בבית הספר להצגה</h3>
            </>
        );
    }
}

export default ClassesNavigate;