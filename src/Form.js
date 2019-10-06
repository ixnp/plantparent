import React from 'react'

class Form extends React.Component {
    state = {
      name: 'name',
      img: 'image url',
      lastwatered: 'last watered',
      frequency: 0
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
                <input onChange={(e)=>this.handelChange(e)}  name="name" type="text"></input>
                <input onChange={(e)=>this.handelChange(e)} name="img" type="text"></input>
                <input onChange={(e)=>this.handelChange(e)}  name="lastwatered" type="text"></input>
                <input onChange={(e)=>this.handelChange(e)}  name="frequency" type="text"></input>
            </form>
        )
    }

}

export default Form;