import React, {Component} from 'react';
import axios from 'axios';


export default  class CreateUser extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            userName : ''
        };

        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onsubmit = this.onsubmit.bind(this);
        
    }
componentDidMount(){
    this.setState({
        userName: ''
    })
}
    onChangeUserName(e){
        this.setState({
            userName : e.target.value
        })
    }
    

onsubmit(e){
    e.preventDefault();
    const user = {
        userName: this.state.userName
    }
    console.log(user);
    axios.post('http://localhost:3002/user/add',user)
    .then(res => console.log(res.data));

    this.setState({userName:''});
}

    render(){
    
        return (
            <div>
                <h3>Create New User </h3>
                <form onSubmit={this.onsubmit}>
                    <div className="form-group">
                        <label>User Name</label>
                        <input type="text" value={this.state.userName} onChange={this.onChangeUserName} />
                    </div>
                    <input type="submit" value="submit"/>
                </form>
            </div>
        );
    
    }
    
    
    }