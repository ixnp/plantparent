import React from 'react';
import './App.css'
import Plants from './Plants.js'
import Form from './Form.js'
import Login from './Login.js'

let API = 'http://localhost:3000/plants'

class App extends React.Component {
  state = {
    plants:null,
    user:null
  }
    componentDidMount = () => {
      if(this.state.user){
        this.renderFetch(API)
      }
    }

    login = (e,login) => {
      e.preventDefault()
      let data = {'username':login}
      console.log(JSON.stringify(data))

      return fetch(`${API}`,{
        method: 'Post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(res=>res.json())
      .then(data=>console.log(data))
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
 
      <div>{
        this.state.user?<div><Plants plants={this.state.plants} update={this.update}></Plants>
        <Form></Form></div>:<Login login={this.login}></Login>
      }
      </div>
    )
  }
}

export default App;