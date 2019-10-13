import React from 'react'

class Login extends React.Component {
    state = {
      name: 'username',
      
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
                <button onClick={(e)=>{this.props.login(e,this.state.username)}}>submit</button>
       
            </form>
        )
    }

}

export default Login;