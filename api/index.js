//const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')({origin: true});
const app = express();
const db = require('./db')

app.use(bodyParser.urlencoded({extended:true}))
app.use(cors)
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use('/', (req, res) => {
    return res.status(200).json({ success: true, message: "Hey"})
})
