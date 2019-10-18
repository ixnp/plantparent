import React from 'react'
import PlantCard from './PlantCrard'

const Plants = (props) => {
    console.log(props.plants)
    return(
        <div>
            {props.plants?props.plants.map(item=> <PlantCard plant={item} update={props.update}></PlantCard>):null}
        </div>

    )
}
export default Plants;
