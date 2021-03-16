const MongoClient = require('mongodb')
const mongouri = 'mongodb://nukkit:nukkit@aytos.souris.cloud:33277/?authSource=nukkit'

module.exports = {
  name: 'players',
  path: '/players',
  method: 'get', // express.js's app.METHOD, not http method!

  async exec(req, res) {
    const query = {}
    if (req.query.hasOwnProperty('online')) {
      query['onlineStatus'] = req.query.online === 'true'
    }

    try {
      MongoClient.connect(mongouri, (err, db) => {
        if (err) throw err
        const dbo = db.db('nukkit')
        dbo.collection('players').find(query).toArray((err, result) => {
          if (err) throw err
          console.log(result)
          res.json({
            status: 'ok',
            players: result
          })
          db.close()
        })
      })
    } catch (mongoException) {
      res.json({
        status: 'error',
        error: mongoException
      })
    }
  }
}
