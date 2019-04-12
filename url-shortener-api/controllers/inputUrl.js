const handleInputUrl = (req, res, db, hash) => {
  const { url } = req.body;
  const urlHash = hash.sha256().update(url).digest('hex').slice(-7)
  db.select('*').from('links').where({url})
    .then( link => {
      if(link.length){
        return res.json(link[0])
      } else{
        db('links')
          .returning('*')
          .insert({
            url: url,
            hash: urlHash,
            shortenedurl: 'https://demoapp.com/' + urlHash
          })
          .then(response => {
            return res.json(response[0])
          })
      }
    })
}

module.exports = {
  handleInputUrl
}