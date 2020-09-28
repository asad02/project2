/* import React, {useState} from 'react';
import './App.css';
import Person from './Person/Person';

function AppNoClass() {
  const [personState, setPersonState] = useState({
    persons: [
      { name: 'Asad', age: 30 },
      { name: 'Mary', age: 30 },
      { name: 'Inaaya', age: 3 }
    ]
  });
  
  const switchNameHandler = () => {
    setPersonState({
      persons: [
        { name: 'Asad1', age: 30 },
        { name: 'Mary1', age: 30 },
        { name: 'Inaaya1', age: 3 }
      ],
      otherState: personState.otherState
    });
  };

  return (
    <div className="App">
      <h1>Hi, I am a react app</h1>
      <p> This is really working, cool!</p>
      <button onClick={switchNameHandler}>Switch Name</button>
      <Person 
        name= { personState.persons[0].name } age={ personState.persons[0].age }/>
      <Person name= { personState.persons[1].name } age={ personState.persons[1].age }/>
      <Person name= { personState.persons[2].name } age={ personState.persons[2].age }/>
    </div>
  );
}

export default AppNoClass;
 */