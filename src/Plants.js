import React from 'react'
import PlantCard from './PlantCrard'
import Notifications from './Notifications'

class Plants extends React.Component {
    

  

 
    render(){
        return(
            <div>
                <Notifications></Notifications>
                {this.props.plants?this.props.plants.map(item=> <PlantCard plant={item} update={this.props.update} ></PlantCard>):null}
            </div>
            
        )
    }

}
export default Plants;