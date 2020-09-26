import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';
//import Radium, {StyleRoot} from 'radium';

class App extends Component {
  state = {
    persons: [
      { id:1, name: 'Asaddsads', age: 30 },
      { id: 2, name: 'Mary', age: 30 },
      { id: 3, name: 'Inaaya', age: 3 }
    ],
    otherState: 'some other valeu',
    showPersons: false
  };

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });
    
    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;
    this.setState({persons: persons});
  };

  deletePersonHandler = (personIndex) => {
    //const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  togglePersonHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  render() {

    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person 
              click = {() => this.deletePersonHandler(index)}
              name = {person.name}
              age ={person.age}
              key ={person.id}
              changed = {(event) => this.nameChangedHandler(event, person.id)}
              />
          })}
      </div>
      );
    };

    //style.backgroundColor = 'red';
    // style[':hover'] = {
    //   backgroundColor: 'salmon',
    //   color: 'red'
    // }

    const classes = [];

    if (this.state.persons.length <= 2) {
      classes.push('red');
    }
    if (this.state.persons.length <= 1) {
      classes.push('bold');
    }

    return (
      // <StyleRoot>
        <div className="App">
          <h1>Hi, I am a react app</h1>
          <p className={classes.join(' ')}> This is really working, cool!</p>
          <button 
            onClick = { this.togglePersonHandler } >Toggle person
          </button>
          {persons}
        </div>
      // </StyleRoot>
    );
  }
}

export default App;