import React from 'react';
import './App.css'
import Plants from './Plants.js'
import Form from './Form.js'
import Login from './Login.js'
import './scss/main.scss';


let API = 'http://localhost:3000/plants'
// let API = ''http://localhost:3000/api/v1/profile''

class App extends React.Component {
  state = {
    plants:null,
    user:null,
    notifcaiton:0
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
            localStorage.setItem('user','test')
          })
          .then(()=> this.datarender())
      }
    
    datarender = () => {
      // console.log(this.state.user.jwt)
     return fetch(API, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.state.user.jwt} `
        }
      })
      .then(res => res.json())
      .then(data => this.setState({plants:data}))
      .then(data => {
        console.log('what')
        for(let i = 0; i < this.state.plants.length; i++){
          console.log('why')
          console.log(this.updateNotifications(this.state.plants[i]))

        }
        // this.state.plants.forEach(plant => this.updateNotifications(plant,newNotifcaiton)
      //  console.log(newNotifcaiton)
      //  this.setState({notifcaiton:newNotifcaiton})
       
      })
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


     updateNotifications = (plant, notifcaiton=this.state.notifcaiton) => {
    
      let date = new Date();
      let day = date.getDate()
      let month = date.getMonth() +1
      let year = date.getFullYear()
      let hours = date.getHours()
      let minutes = date.getMinutes()
      let fulldate =`${year}-${month}-${day}`
       
        let months31 = {1:31,3:31,5:31,7:31,8:31,10:31,12:31}
        let months30 = {2:28,4:30,6:30,9:30,11:30}
    

      
        let lastWateredDate = plant.lastwatered.split('-')
        let lastWateredDay = parseInt(lastWateredDate[2])
        
        if(lastWateredDay +plant.frequency < 30 && months30[lastWateredDate[1]]){
          lastWateredDate[2] = lastWateredDay +plant.frequency
          lastWateredDate.join('-')
        }else if(lastWateredDay +plant.frequency == 31 && months31[lastWateredDate[1]] ){
          lastWateredDate[2] = lastWateredDay +plant.frequency
          lastWateredDate.join('-')
        } else if(months30[lastWateredDate[1]]) {
            let sum = lastWateredDay + plant.frequency;
       
            let difference = sum - 30
            lastWateredDate[2] = difference
           let newMonth = parseInt(lastWateredDate[1])
           lastWateredDate[1] = newMonth +1
           lastWateredDate.join('-')
        }else if(months31[lastWateredDate[1]]) {
            let sum = lastWateredDay + plant.frequency;
            let difference = sum - 31
            lastWateredDate[2] = difference
           let newMonth = parseInt(lastWateredDate[1])
           lastWateredDate[1] = newMonth +1
           lastWateredDate.join('-')
        }
 
     
        
      let GivenDate = date;
      let CurrentDate = new Date();
      GivenDate = new Date(GivenDate);

      if(GivenDate < CurrentDate){
         notifcaiton = notifcaiton+1
         console.log(notifcaiton, "whyyyyyyyy")
      }else{
          console.log("it good")
      }
      console.log('notification', notifcaiton)
      return notifcaiton
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