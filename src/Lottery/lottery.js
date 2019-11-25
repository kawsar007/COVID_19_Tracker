import React, { Component } from 'react';
import Ball from './Ball';
// import '/Ball.css';

class Lottery extends Component {

    static defaultProps = {
        title: 'Lotto',
        maxBalls: 6,
        maxNum: 40
    }

    state = {
        nums: Array.from({length: this.props.maxBalls})
    }

    handleClick = () => {
       this.setState(curState => ({
           nums: curState.nums.map(n => Math.floor(Math.random() * this.props.maxNum) + 1)
       }))
    }

    // _handleClick = () => {
    //     this.generate();
    // };
   
    render() { 
        return ( 
            <section className="Lottery">
               <h1>{this.props.title}</h1>
               <div>
                   {this.state.nums.map(n => (
                       <Ball num={n}/>
                   ))}
               </div>
               <button onClick={this.handleClick}>Generate</button>
            </section>
         );
    }
}
 
export default Lottery;