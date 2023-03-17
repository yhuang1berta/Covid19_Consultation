import React from'react'
import {uid} from 'react-uid'


function SymptomChecklist(props) {

    const list = props.list
    const symptoms = ["Temperature", "Stomache", "Nausea"]

    return(
        <div>
            <h2>Symptom info:</h2>
            <span>Last updated on {props.date.getFullYear()}.{props.date.getMonth()+1}.{props.date.getDate()}</span>
            <ul>
                {list.map((symptom, i) => (
                    <li key={uid(symptom)}>
                        {symptoms[i]}: {symptom}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default SymptomChecklist