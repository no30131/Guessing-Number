import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  useEffect(() => {
    const randomNum = () => {
      const num = Math.floor(Math.random() * 100) + 1;
      setTargetNum(num);
    };
    randomNum();
  }, []);
  
  // init
  const [targetNum, setTargetNum] = useState(0);
  const [guessNum, setGuessNum] = useState("");
  const [message, setMessage] = useState("");
  const [firstNum, setFirstNum] = useState(1);
  const [secondNum, setSecondNum] = useState(100);

  console.log("answer: " + targetNum);

  // guessing number
  const checkGuess = () => {
    const userGuess = parseInt(guessNum);
    console.log(`userGuess: ${userGuess}`);

    if (userGuess === targetNum) {
      setMessage(`恭喜猜對！答案是 ${targetNum}`);
    } else if (userGuess > targetNum){  
      setMessage("太大了！");
      setSecondNum(userGuess);
    } else {
      setMessage("太小了！");
      setFirstNum(userGuess);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>
        <img src={logo} className="App-logo" alt="logo" />    
        <h1>猜數字遊戲</h1>
        <p>
          <span className="firstNum">{firstNum}</span> 到{' '}
          <span className="secondNum">{secondNum}</span> 之間的數字，你猜是多少？
        </p>    
        <input type="text" id="guessNum" onChange={(e) => setGuessNum(e.target.value)} value={guessNum} />
        <button onClick={checkGuess}>猜!</button>
        <p className="message">{message}</p>
        </div>
      </header>
    </div>
  );
}

export default App;
