import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Exercise = props =>(
    <tr>
        <td>{props.exercise.userName}</td>
        <td>{props.exercise.password}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.date}</td>
        <td><Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={()=> props.deleteExercise(props.exercise._id)}>Delete</a> </td>
    </tr>
)
    

export default  class ExerciseList extends Component{
    
    constructor(props){
        super(props);
        this.deleteExercise = this.deleteExercise.bind(this);
        this.exerciseList = this.exerciseList.bind(this);
        this.state = {exercises:[]};
    }

    componentDidMount(){
        axios.get('http://localhost:3002/exercise')
        .then((response) => {
            if(response.data.length >0 ){
                this.setState({
                    exercises: response.data
                })

            }
        })
        .catch((error) => console.log(error));
    }
        deleteExercise(id){
            axios.delete('http://localhost:3002/exercise/'+id)
            .then((res) => console.log(res.data));

            this.setState({
                exercises: this.state.exercises.filter(exercise => exercise._id !== id)
            });

        }

        exerciseList(){
           return  this.state.exercises.map(exercise => {
            return    <Exercise exercise={exercise} deleteExercise={this.deleteExercise} key={exercise._id} />
           })
        }
    render(){
    
        return (
    <div className="container">
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>User Name</th>
                    <th>Pasword</th>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
            {this.exerciseList()}
            </tbody>
        </table>
    </div>
    
        );
    
    }
    
    
    }