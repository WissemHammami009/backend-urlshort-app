const express = require('express')

const mongodb = require('mongoose')

const crypto = require('crypto')
userroute = require('./api/user')
linkroute = require('./api/link')
const app = express()
require('dotenv').config()
var bodyParser = require('body-parser')
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    host:"smtp.gmail.com",
    auth: {
      user: 'hammamiwissem21@gmail.com',
      pass: 'fqmpninnfvwxysiu'
    }
  });

app.use(bodyParser.json());


app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

app.get('/',(req,res)=>{
    res.sendFile('./views/index.html',{root:__dirname})
})
app.use('/api/user/',userroute);
app.use('/api/link/',linkroute);

app.listen(process.env.PORT,()=>{
    console.log(`server running on ${process.env.PORT} !!`)
})
app.get('/get',(req,res)=>{
    res.send("ok")
})
mongodb.connect(process.env.MONGO_URI, { useNewUrlParser: true })
const db = mongodb.connection
db.once('open', _ => {
  console.log('Database connected')
})
db.on('error', err => {
  console.error('connection error:', err)
})
