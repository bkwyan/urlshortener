const handleShortenedUrl = (req, res, db) => {
  const { hash } = req.params;
  db.select('url').from('links').where('hash', '=', hash)
    .then(url => {
      res.redirect(301, url[0].url)
    })
}

module.exports = {
  handleShortenedUrl
}