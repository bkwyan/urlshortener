const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const hash = require('hash.js');
const knex = require('knex')

const inputUrl = require('./controllers/inputUrl');
const shortenedUrl = require('./controllers/shortenedUrl')

const db = knex({
  client: 'pg',
  connection:{
    host: '127.0.0.1',
    user: 'postgres',
    password: 'test',
    database: 'url-shortener'
  }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, PUT, DELETE, GET, OPTIONS');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.post('/newurl', (req,res) => {inputUrl.handleInputUrl(req, res, db, hash)})

app.get('/:hash', (req, res) => {shortenedUrl.handleShortenedUrl(req, res, db)})

app.listen(3000, () => {
  console.log('app is running on port 3000');
})