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
            <div className="form-container">
                <h1>Plant Parent</h1>
                <div>
                <form className="login-form">
                    <input onChange={(e)=>this.handelChange(e)}  name="username" type="text" placeholder="username"></input>
                    <input onChange={(e)=>this.handelChange(e)}  name="password" type="text" placeholder="password"></input>
                    <div className="btn">
                    <button onClick={(e)=>{this.props.login(e,this.state)}}>sign up</button>
                    <button onClick={(e)=>{this.props.auth(e,this.state)}}>login</button>
                    </div>
                </form>
                </div>
            </div>
        )
    }

}

export default Login;