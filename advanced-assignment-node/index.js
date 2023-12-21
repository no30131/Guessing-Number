const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()
const PORT = 3001
const mongoose = require('mongoose')

require('dotenv').config()

const uri = process.env.MONGO_URI
const options = {
	// useNewUrlParser: true,
	// useUnifiedTopology: true,
}

// connect to MongoDB
mongoose
	.connect(uri, options)
	.then(() => {
		console.log('MongoDB is connected')
	})
	.catch((err) => {
		console.log(err)
	})

app.use(express.json())

// app.get("/test", (req, res) => {
// 	res.send({msg: "vegan world!"})
// 	//res.status(404).json({ error: 'Page111 did not exist' })
// })

const corsOptions = {
	origin: 'http://localhost:3000',
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	optionsSuccessStatus: 200
}

app.use(cors()); 
		

// 定義 Schema
const gameSchema = new mongoose.Schema({
	createdAt: {
	  type: Date,
	  default: Date.now
	},
	numberOfGuesses: Number,
	answer: Number,
	isSuccess: Boolean
  });
  
  // 創建模型
  const Game = mongoose.model('Game', gameSchema);
  
  app.get("/answer", async (req, res) => {
	try {
	  // 獲取隨機答案
	  const randomAnswer = Math.floor(Math.random() * 100) + 1;
  
	  // 創建新的遊戲文檔
	//   const newGame = new Game({
	// 	numberOfGuesses: 0,
	// 	answer: randomAnswer,
	// 	isSuccess: false
	//   });
  
	  // 將新遊戲保存到數據庫
	//   await newGame.save();
  
	  res.send({ answer: randomAnswer });
	} catch (error) {
	  console.error('Error:', error);
	  res.status(500).send('Error generating answer');
	}
  });

  app.post("/record", async (req, res) => {
	// 獲取前端發送的資料
	const { isSuccess, targetNum, guessNum } = req.body; 

	// 創建一個新的遊戲文檔
	const newGame = new Game({
	  numberOfGuesses: guessNum,
	  answer: targetNum,
	  isSuccess: isSuccess
	});
  
	try {
	  // 將新遊戲保存到數據庫
	  const savedGame = await newGame.save();
	  console.log('Saved game to database:', savedGame);
	  res.status(200).send({ message: 'Game data saved to database' });
  	} catch (error) {
	  console.error('Error saving game data:', error);
	  res.status(500).send({ error: 'Error saving game data' });
	}
  });

app.use((err, req, res, next) => {
	const status = err.status || 500
	if (status === 500) {
		console.log('The server errored when processing a request')
		console.log(err)
	}
	
	res.status(status)
	res.send({
		status: status,
		message: err.message,
	})
})

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`)
})
