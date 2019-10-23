import React from 'react'
import { faTint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



const PlantCard = ({plant,update}) => {
    let date = new Date();
    let day = date.getDate()
    let month = date.getMonth()
    let year = date.getFullYear()
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let fulldate =`${day}/${month}/${year} ${hours}:${minutes}`
    
    return(
        <div className="plant-card-container">
           
            <img src={plant.img}></img>
            <div className="plant-card-info">
            <h3>{plant.name}</h3>
            <div>{plant.lastwatered}</div>
            <button onClick={()=>update(fulldate,plant.id)}><FontAwesomeIcon icon={faTint} /></button>
            </div>
        </div>
    )

}

export default PlantCard;