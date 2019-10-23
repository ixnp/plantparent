import React from 'react';
import './App.css'
import Plants from './Plants.js'
import Form from './Form.js'
import Login from './Login.js'
import './scss/main.scss';
import tempPlants from './db.json'

let API = 'http://localhost:3000/plants'
// let API = ''http://localhost:3000/api/v1/profile''

class App extends React.Component {
  state = {
    plants:null,
    user:null
  }
    componentDidMount = () => {
    console.log(localStorage.getItem('user'))
      if(this.state.user){
        this.renderFetch(API)
      }
 
    }


    login = (e, login) => {
    e.preventDefault()
      fetch('http://localhost:3000/api/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          user: {
            username: login.username,
            password: login.password,
            bio: 'King of Flavortown, USA',
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Guy_Fieri_at_Guantanamo_2.jpg'
          }
        })
      })
        .then(res => res.json())
        .then(data => this.setState({user:data}))
        .then(()=> console.log(this.state))
        .catch(error => console.error('login: ',error))
    }
    auth = (e, login) => {
      e.preventDefault()
        fetch('http://localhost:3000/api/v1/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({
            user: {
              username: login.username,
              password: login.password
            }
          })
        })
          .then(res => res.json())
          .then(data =>  {
            console.log(data)
            
          this.setState({user:data})
        })
          .then(data => {
            //need to run rails server//
            console.log(this.state.user)
            localStorage.setItem('user',this.state.user)
          })
          .then(()=> this.datarender())
          .catch(error => console.error('auth: ',error))
      }

    datarender = () => {
      console.log(this.state.user)
     return fetch(API, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.state.user.jwt} `
        }
      })
      .then(res => res.json())
      .then(data => {
        if(data.status !== 400){
          this.setState({plants:tempPlants.plants})
        }else {
          this.setState({plants:data})
        }

      })
      .catch(error => console.error('datarender: ',error))
    }

    // renderFetch = (api) => {
    //   return fetch(api)
    //   .then(res => res.json())
    //   .then(data =>  this.setState({plants:data}))

    // }

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
        <Form></Form></div>:<Login login={this.login} auth={this.auth}></Login>
      }
      </div>
    )
  }
}

export default App;
