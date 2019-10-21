import React from 'react'
import { tsPropertySignature } from '@babel/types';

const PlantCard = ({plant,update,notifcaiton}) => {
    let date = new Date();
    let day = date.getDate()
    let month = date.getMonth() +1
    let year = date.getFullYear()
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let fulldate =`${year}-${month}-${day}`

    let updateNotifications = (plant) => {
       
        let months31 = {1:31,3:31,5:31,7:31,8:31,10:31,12:31}
        let months30 = {2:28,4:30,6:30,9:30,11:30}
    

        let date = plant.lastwatered.split('-')
        let lastWateredDay = parseInt(date[2])
        
        if(lastWateredDay +plant.frequency < 30 && months30[date[1]]){
            date[2] = lastWateredDay +plant.frequency
            date.join('-')
        }else if(lastWateredDay +plant.frequency == 31 && months31[date[1]] ){
            date[2] = lastWateredDay +plant.frequency
            date.join('-')
        } else if(months30[date[1]]) {
            let sum = lastWateredDay + plant.frequency;
       
            let difference = sum - 30
            date[2] = difference
           let newMonth = parseInt(date[1])
           date[1] = newMonth +1
           date.join('-')
        }else if(months31[date[1]]) {
            let sum = lastWateredDay + plant.frequency;
            let difference = sum - 31
            date[2] = difference
           let newMonth = parseInt(date[1])
           date[1] = newMonth +1
           date.join('-')
        }
 
     
        
        let GivenDate = date;
let CurrentDate = new Date();
GivenDate = new Date(GivenDate);

if(GivenDate < CurrentDate){
    notifcaiton()
}else{
    console.log("it good")
}
    }

    return(
        <div className="plant-card-container">
            <img src={plant.img}></img>
            <h3>{plant.name}</h3>
            <div>{plant.lastwatered}</div>
            <button onClick={()=>update(fulldate,plant.id)}>water</button>
        </div>
    )

}

export default PlantCard;