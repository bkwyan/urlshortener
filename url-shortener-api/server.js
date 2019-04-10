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

/*
POST ---> ADD STUFF
PUT ----> UPDATE STUFF
/url/:id ---> GET = ShortenedUrl
/shortenedurl ---> PUT = ShortenedURL
/newurl  ----> POST = OriginalURL
/existingurl ----> PUT = entries

string.slice(-7) ---> takes last 7 characters
*/

const database = {
  links: [
    {
      url: 'https://www.amazon.ca/Xbox-One-Wireless-Controller-Black/dp/B01LPZM7VI?pd_rd_wg=1AOCi&pd_rd_r=b39874cf-55c4-446c-8d9b-e78c7689d1d7&pd_rd_w=JCDfK&ref_=pd_gw_ri&pf_rd_r=MTKNPJAKFYGYQ7XE5JWJ&pf_rd_p=2d673723-457b-555b-bfac-09c1f97708f0',
      id: '123',
      shortenedurl: 'https://www.amazon.ca/Xbox-One-Wireless-Controller-Black/dp/ABC',
      entries: 0
    },
    {
      url: 'https://www.amazon.ca/All-new-Echo-Dot-3rd-gen/dp/B0792JYXZK/ref=lp_667823011_1_8?s=electronics&ie=UTF8&qid=1554780559&sr=1-8',
      id: '124',
      shortenedurl: 'https://www.amazon.ca/All-new-Echo-Dot-3rd-gen/dp/EFG',
      entries: 0
    }
  ]
}

app.get('/', (req, res) => {
  res.send(database.links);
})

app.put('/url', (req,res) => {
  const { url } = req.body;
  db('links').where('url', '=', url)
  .returning('*')
  .then(link => {
    if(link.length){
      db('links').where('url', '=', url)
        .increment('entries', 1)
    } else {
      db('links').insert({
        url: url,
        shortenedurl: 'https://demoapp.com/' + hash.sha256().update(url).digest('hex').slice(-7)
      })
    }
    res.json(link[0])
  })
})

app.get('/url', (req, res) => {
  const { id } = req.body;
  let found = false;
  database.links.forEach(link => {
    if(link.id === id){
      found = true;
      res.json(link);
    }
  })
  if(!found){
    res.json('not in our database');
  }
})

app.put('/existingurl', (req, res) => {
  const { id } = req.body;
  let found = false;
  database.links.forEach(link => {
    if(link.id === id){
      found = true;
      link.entries++
      res.json(link.entries);
    }
  })
  if(!found){
    res.json('not in our database');
  }
})

app.listen(3000, () => {
  console.log('app is running on port 3000');
})