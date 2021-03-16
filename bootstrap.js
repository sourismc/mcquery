const express = require('express')
const http = require('http')
const sockio = require('socket.io')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')

module.exports = function () {
  const app = express()
  const httpServer = http.createServer(app)
  const ioOptions = {}
  const io = sockio(httpServer, ioOptions)

  app.use(morgan('combined'))
  app.use(helmet())
  app.use(cors({origin: '*'}))

  console.log('Bootstrapping done!')

  return {
    app,
    httpServer,
    io
  }
}