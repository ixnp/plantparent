import React from 'react'

const PlantCard = ({plant,update}) => {
    let date = new Date();
    let day = date.getDate()
    let month = date.getMonth()
    let year = date.getFullYear()
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let fulldate =`${day}/${month}/${year} ${hours}:${minutes}`
    
    return(
        <div>
            <img src={plant.img}></img>
            <h3>{plant.name}</h3>
            <div>{plant.lastwatered}</div>
            <button onClick={()=>update(fulldate,plant.id)}>water</button>
        </div>
    )

}

export default PlantCard;