import React, { Component } from 'react';
import './BoxContainer.css';
import Box from './Box';

class BoxContainer extends Component {

    static defaultProps = {
        numBoxes: 18
    }

    state = {  }
    render() { 
        const boxes = Array.from({length: this.props.numBoxes}).map(() => (
            <Box/>
        ))
        console.log(boxes)
        return ( 
            <div className="BocContainer">
                {boxes}
            </div>
         );
    }
}
 
export default BoxContainer;