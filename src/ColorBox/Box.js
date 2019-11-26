import React, { Component } from 'react';
import { choice } from './helper';
import './Box.css';

class Box extends Component {

    static defaultProps = {
        allColors: ["purple", "magenta", "violet", "pink"]
    };

    state = { 
        color: choice(this.props.allColors)
     }

     colorClick = () => {
         let newColor = choice(this.props.allColors);
         this.setState({
             color: newColor
         })
     }

     handleClick = () => {
         this.colorClick();
     }

    render() { 
        return ( 
            <div className="Box" style={{ backgroundColor: this.state.color }} onClick={this.handleClick}>
                
            </div>
         );
    }
}
 
export default Box;