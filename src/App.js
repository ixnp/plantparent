import React from 'react';
import './App.css'
import Plants from './Plants.js'
import Form from './Form.js'

let API = 'http://localhost:3000/plants'

class App extends React.Component {
  state = {
    plants:null
  }
    componentDidMount = () => {
      this.renderFetch(API)
  
    }
    renderFetch = (api) => {
      return fetch(api)
      .then(res => res.json())
      .then(data =>  this.setState({plants:data}))
      
    }

    update = (data,id) => {
      console.log(data,id)
      let updatedPlantsArr = this.state.plants
      let updatedPlant = ''
      updatedPlantsArr.map(item => {
       
        if(item.id == id){
          item.lastwatered = data;
          updatedPlant = item
        }
      });
    
      
      this.setState({plants:updatedPlantsArr})
    
      return fetch(`${API}/${id}`,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedPlant)
      })
      .then(res=>res.json())
    }
  render(){
   
    return(
      <div>
        App
        <Plants plants={this.state.plants} update={this.update}></Plants>
        <Form></Form>
      </div>
    )
  }
}

export default App;