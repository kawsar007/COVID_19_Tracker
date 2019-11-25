import React, { Component } from 'react';
import './Die.css';

class Die extends Component {
    state = {  }
    
    render() { 
        return <i className={`Die fa fa-dice-${this.props.face}`}/>;
    }
}
 
export default Die;