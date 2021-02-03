import React, { useEffect, useRef, useContext} from 'react';

import styles from './Cockpit.module.css';

import AuthContext from '../../context/auth-context';

const Cockpit = (props) => {

  const toggleBtnRef = useRef(null);
  const authContext = useContext(AuthContext);

  useEffect(()=> {
    console.log('[Cockpit.js] useEffect');
    // setTimeout(() => {
    //   alert('Saved some data');
    // }, 1000);
    toggleBtnRef.current.click();
    return () => {
      console.log('clean up');
    }
  }, []);

  useEffect(() => {
    console.log('[ Cockpit.js ] 2nd useEffect');
    return () => {
      console.log('[ Cockpit.js ] cleanup 2nd work in useEffect');
    }
  });

  const assignedClasses = [];
  let btnClass = [];

  if (props.showPersons) {
    btnClass = styles.Red;
  }

  if (props.persons.length <= 2) {
    assignedClasses.push(styles.red);
  }

  if (props.persons.length <= 1) {
    assignedClasses.push(styles.bold);
  }

  return (
    <div className={styles.Cockpit}>
      <h1>{props.title}</h1>
      <p className={assignedClasses.join(' ')}> This is really working, cool!</p>
      <button 
        ref={toggleBtnRef}
        className={btnClass}
        onClick={props.clicked} >Toggle person
      </button>
      <button onClick={authContext.login}> Log In </button>
    </div>
  );
};

export default Cockpit;
