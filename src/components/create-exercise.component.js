import React, {Component} from 'react';
import axios from 'axios';
import Datepicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"

export default  class CreateExercise extends Component{
    constructor(props){
        super(props);
        this.state = {
            userName : "",
            description : "",
            password : "",
            date : new Date(),

            users : [ ]

        };

        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangePassword= this.onChangePassword.bind(this);
        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onsubmit = this.onsubmit.bind(this);
        
    }
componentDidMount(){
axios.get("http://localhost:3002/user/")
.then(response => {
    if(response.data.length >0){
        this.setState({
            users : response.data.map(user => user.userName),
            userName: response.data[0].userName
        })
    }
})

    
}
    onChangeUserName(e){
        this.setState({
            userName : e.target.value
        })
    }
    onChangeDescription(e){
        this.setState({
            description : e.target.value
        })
    }
    onChangePassword(e){
        this.setState({
            password : e.target.value
        })
    }
    onChangeDate(date){
        this.setState({
            date : date
        })
    }

onsubmit(e){
    e.preventDefault();
    const exercise = {
        userName: this.state.userName,
        password: this.state.password,
        description: this.state.description,
        date: this.state.date
    }
    console.log(exercise);
    axios.post('http://localhost:3002/exercise/add',exercise)
    .then(res => console.log(res.data));

    window.location = "/";
}

    render(){
    
        return (
            <div>
                <h3>Create New Exercise </h3>
                <form onSubmit={this.onsubmit}>
                    <div className="form-group">
                        <label >User</label>
                        <select value={this.state.userName} id="userNameSelect" className="form-control" onChange={this.onChangeUserName}>
                        {
                            this.state.users.map(function(elem){
                                return <option key={elem} value={elem} >{elem}</option>
                            })
                        }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input className="form-control" type="text" value={this.state.password} onChange={this.onChangePassword} />
                    </div>

                    <div className="form-group">
                        <label>description</label>
                        <input className="form-control" type="text" value={this.state.description} onChange={this.onChangeDescription} />
                    </div>

                    <div className="form-group">
                        <label>Date</label>
                        <Datepicker selected={this.state.date}
                                onChange={this.onChangeDate}
                        ></Datepicker>
                    </div>
                    <input className="form-control btn btn-primary" type="submit" value="submit"/>
                </form>
            </div>
        );
    
    }
    
    
    }