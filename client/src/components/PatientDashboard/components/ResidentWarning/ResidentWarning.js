import React from 'react'

function ResidentWarning(props) {
    return (
        <div>
            <h3>You are a resident at {props.province}</h3>
            <p> Percentage of infected population in your region is: {props.percent} </p>
        </div>
    )
}

export default ResidentWarning