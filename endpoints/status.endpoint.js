const gameserverUtil = require('minecraft-server-util')

module.exports = {
  name: 'status',
  path: '/status',
  method: 'get', // express.js's app.METHOD, not http method!

  async exec(req, res) {
    let state
    try {
      state = await gameserverUtil.statusBedrock('aytos.souris.cloud')
    } catch(e) {
      return res.json({
        requestStatus: 'error',
        error: e
      })
    }

    if (state) {
      res.json({
        requestStatus: 'ok',
        host: state.host,
        port: state.port,
        edition: state.edition,
        motd: [state.motdLine1.toString(), state.motdLine2.toString()],
        version: state.version,
        maxPlayers: state.maxPlayers,
        onlinePlayers: state.onlinePlayers,
        gameMode: state.gameMode,
        serverID: state.serverID
      })
    } else {
      res.json({
        requestStatus: 'error',
        error: new Error('unknown')
      })
    }
  }
}
