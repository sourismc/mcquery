const glob = require('glob')
const path = require('path')

module.exports = function (app) {
  console.log('Registering endpoints...')
  const allEndpoints = {}

  glob.sync('./endpoints/*.endpoint.js').forEach(file => {
    const endpoint = require(path.resolve(file))
    if (endpoint) {
      app[endpoint.method](endpoint.path, endpoint.exec)
      console.log('[endpoint +]', endpoint.method.toUpperCase(), endpoint.path)
      if (!allEndpoints.hasOwnProperty(endpoint.method.toUpperCase())) {
        allEndpoints[endpoint.method.toUpperCase()] = {}
      }
      allEndpoints[endpoint.method.toUpperCase()][endpoint.name] = endpoint.path
    }
  })

  console.log('Registering root endpoint GET \'/\'')
  app.get('/', (req, res) => {
    res.json(allEndpoints)
  })
}