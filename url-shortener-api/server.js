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

/*
string.slice(-7) ---> takes last 7 characters
*/

const database = {
  links: [
    {
      url: 'https://www.amazon.ca/Xbox-One-Wireless-Controller-Black/dp/B01LPZM7VI?pd_rd_wg=1AOCi&pd_rd_r=b39874cf-55c4-446c-8d9b-e78c7689d1d7&pd_rd_w=JCDfK&ref_=pd_gw_ri&pf_rd_r=MTKNPJAKFYGYQ7XE5JWJ&pf_rd_p=2d673723-457b-555b-bfac-09c1f97708f0',
      hash: 'ABC',
      shortenedurl: 'https://www.amazon.ca/Xbox-One-Wireless-Controller-Black/dp/ABC',
      entries: 0
    },
    {
      url: 'https://www.amazon.ca/All-new-Echo-Dot-3rd-gen/dp/B0792JYXZK/ref=lp_667823011_1_8?s=electronics&ie=UTF8&qid=1554780559&sr=1-8',
      hash: 'EFG',
      shortenedurl: 'https://www.amazon.ca/All-new-Echo-Dot-3rd-gen/dp/EFG',
      entries: 0
    }
  ]
}

app.get('/', (req, res) => {
  res.send(database.links);
})

app.post('/newurl', (req,res) => {
  const { url } = req.body;
  database.links.push({
    url: url,
    hash: hash.sha256().update(url).digest('hex').slice(-7),
    shortenedurl: 'localhost:3001/' + hash.sha256().update(url).digest('hex').slice(-7)
  })
  res.json(database.links[database.links.length-1]);
})

app.get('/:hash', (req, res) => {
  const { hash } = req.params;
  let found = false;
  database.links.forEach(link =>{
    if(link.hash === hash){
      found = true;
      res.redirect(link.url)
    }
  })
  .catch(err => res.status(400).json('error getting link'))
})

app.listen(3000, () => {
  console.log('app is running on port 3000');
})