import React from 'react'

class Login extends React.Component {
    state = {
      name: 'username',
      password: 'password'
      
    }


    handelChange = (e) => {
       let target = e.target;
       let name = target.name;
       let value = target.value;
       this.setState({
           [name]:value
       })

    }
    render(){
        return(
            <form>
                <input onChange={(e)=>this.handelChange(e)}  name="username" type="text"></input>
                <input onChange={(e)=>this.handelChange(e)}  name="password" type="text"></input>
                <button onClick={(e)=>{this.props.login(e,this.state)}}>sign up</button>
                <button onClick={(e)=>{this.props.auth(e,this.state)}}>login</button>

            </form>
        )
    }

}

export default Login;