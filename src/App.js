import React, {Component} from 'react';
import Person from './Person/Person';
import UserInput from './UserInput/UserInput';
import UserOutput from './UserOutput/UserOutput';
import Char from "./Char/Char";
import './App.css';

class App extends Component{
    state = {
        persons: [
            {name: "Shashank", age: 29},
            {name: "Akhilaa", age: 29}
        ],
        userName: "Shashank"
    };

    render() {
        const username = this.state.userName + "";
        const elems = username.split("").map((char, index) => {
            return (<Char changed={this.removeChar.bind(this, index)} character={char} key={index}/>)
        });
        return (
            <div className="App">
                <h1>Hi, I'm react app</h1>
                <button onClick={this.switchHandler}>Click Me</button>
                <Person name={this.state.persons[0].name} age={this.state.persons[0].age}/>
                <Person changed={this.nameChangeHandler} name={this.state.persons[1].name} age={this.state.persons[1].age}>My Age is:</Person>
                <UserInput userName={this.state.userName} changed={this.userNameChange}/>
                <UserOutput userName={this.state.userName}/>
                {elems}
            </div>
        );
    }

    removeChar = (index) => {
        let username = (this.state.userName + "").split("");
        username.splice(index, 1);
        this.setState({
            userName: username.join("")
        });
    }

    switchHandler = () => {
        this.setState({
            persons: [
                {name: "Gunda", age: 5},
                {name: "Gundi", age: 5}
            ]
        })
    }

    nameChangeHandler = (event) => {
        this.setState({
            persons: [
                {name: "Gunda", age: 5},
                {name: event.target.value, age: 5}
            ]
        })
    }

    userNameChange = (event) => {
        this.setState({
            userName: event.target.value
        });
    };
}

export default App;
