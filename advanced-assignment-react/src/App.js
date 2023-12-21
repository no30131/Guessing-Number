import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const baseURL = "http://localhost:3001";

function App() {
  // useEffect(() => {
  //   const randomNum = () => {
  //     const num = Math.floor(Math.random() * 100) + 1;
  //     setTargetNum(num);
  //   };
  //   randomNum();
  // }, []);

  // useEffect(() => {
  //   axios.get(`${baseURL}/answer`)
  //     .then((response) => {
  //       setTargetNum(response.data.answer);
  //       // console.log(`取得${targetNum}`);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data: , error');
  //     });
  // },[]);
    
  // init
  const [targetNum, setTargetNum] = useState(
    () => {
    axios.get(`${baseURL}/answer`)
      .then((response) => {
        setTargetNum(response.data.answer);
        console.log(`取得${targetNum}`);
      })
      .catch((error) => {
        console.error('Error fetching data: , error');
      });
  },[]);
  // const [targetNum, setTargetNum] = useState(0);
  const [guessNum, setGuessNum] = useState("");
  const [message, setMessage] = useState("");
  const [firstNum, setFirstNum] = useState(1);
  const [secondNum, setSecondNum] = useState(100);
  const [isSuccess, setIsSuccess] = useState(false);
  
  console.log("answer: " + targetNum);

  // guessing number
  const checkGuess = () => {
    const userGuess = parseInt(guessNum);
    console.log(`userGuess: ${userGuess}`);

    let currentIsSuccess = false;

    if (userGuess === targetNum) {
      setMessage(`恭喜猜對！答案是 ${targetNum}`);
      currentIsSuccess = true;
    } else if (userGuess > targetNum){  
      setMessage("太大了！");
      setSecondNum(userGuess);
    } else {
      setMessage("太小了！");
      setFirstNum(userGuess);
    }
  
    setIsSuccess(currentIsSuccess);

  // 用 useEffect 來監聽猜對猜錯狀態的改變
  // useEffect(() => {
    console.log("isSuccess:", isSuccess);
  // });

  const dataToSend = {
    isSuccess: isSuccess,
    targetNum: targetNum,
    guessNum: guessNum
  };

  axios.post(`${baseURL}/record`, dataToSend)
    .then((response) => {
      console.log(`返回${response.data}`);
    })
    .catch((error) => {
      console.error('Error sending data to backend :, error');
    });
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
