module.exports = function (io) {
  console.log('Registering Socket.IO Server')

  io.on('connection', socket => {
    console.log('incoming connection')
  })
}
