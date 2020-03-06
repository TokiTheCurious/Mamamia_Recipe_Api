const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')({origin: true});
const app = express();
const db = require('./db')
const recipeRouter = require('./routes/recipe-router')

app.use(bodyParser.urlencoded({extended:true}))
app.use(cors)
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use('/api', recipeRouter)

exports.app = functions.https.onRequest(app);
