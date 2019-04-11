const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const hash = require('hash.js');
const knex = require('knex')

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
  res.setHeader('Access-Contrl-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, PUT, DELETE, GET, OPTIONS');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.post('/newurl', (req,res) => {
  const { url } = req.body;
  const urlHash = hash.sha256().update(url).digest('hex').slice(-7)
  db.select('*').from('links').where({url})
    .then( link => {
      if(link.length){
        res.json(link[0])
      } else{
        db('links')
          .returning('*')
          .insert({
            url: url,
            hash: urlHash,
            shortenedurl: 'localhost:3000/' + urlHash
          })
          .then(response => {
            res.json(response[0])
          })
      }
    })
})

app.get('/:hash', (req, res) => {
  const { hash } = req.params;
  db.select('url').from('links').where('hash', '=', hash)
    .then(url => {
      res.redirect(url[0].url)
    })
})

app.listen(3000, () => {
  console.log('app is running on port 3000');
})