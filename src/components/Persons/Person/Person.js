import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Aux from '../../../hoc/Aux';
import withClass from '../../../hoc/withClass';
import styles from './Person.module.css';
import AuthContext from '../../../context/auth-context';

class Person extends Component { 
    constructor(props) {
        super(props);
        this.inputElementRef = React.createRef();
    }

    static contextType = AuthContext;

    componentDidMount() {
        this.inputElementRef.current.focus();
        console.log(this.context.authenticated);
    }

    render() {
        console.log('[Person.js] is rendering..');
        return (
            <Aux>
                {this.context.authenticated? <p>Authenticated</p> : <p>Please Login</p>}
                <p key="id1" onClick={this.props.click}>I'm {this.props.name} and I am { this.props.age } years old!</p>
                <p key="id2">{this.props.children}</p>
                <input key= "id3"
                    // ref={(inputEl) => {this.inputElement = inputEl}}
                    ref={this.inputElementRef}
                    type='text' 
                    onChange={ this.props.changed } 
                    value = {this.props.name}>
                </input>
            </Aux>
        );
    };
};

Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
};

export default withClass(Person, styles.Person);
