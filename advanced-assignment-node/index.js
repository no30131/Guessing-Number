// index.js

const express = require('express')
const path = require('path')
const app = express()
const PORT = 3000
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

app.get("/test", (req, res) => {
	res.send({msg: "vegan world!"})
	//res.status(404).json({ error: 'Page111 did not exist' })
})

app.get("/answer", (req, res) => {
	res.send({answer: Math.floor(Math.random() * 100) + 1})
})

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
