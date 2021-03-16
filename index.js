const bootstrap = require('./bootstrap')
const endpoints = require('./endpoints/')
const sockets = require('./sockets/')

const port = 19199
const { app, httpServer, io } = bootstrap()

endpoints(app)
sockets(io)

httpServer.listen(port, () => {
  console.log(`MCQuery is running on :${port}`)
})
