import React from 'react';
import './App.css';
import Die from './Die';
import RollDice from './RollDice';
import Count from './Component/count';
import Ball from './Lottery/Ball';
import Lottery from './Lottery/lottery';

function App() {
  return (
    <div className="App">
      <h2>Hello React</h2>
      <RollDice/>
      <Count/><hr/>
      <Lottery/>
      <Lottery title='Mini Daily' maxNum={10} maxBalls={4}/>
    </div>
  );
}

export default App;