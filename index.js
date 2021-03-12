const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const app = express()
const port = 19199
const gameserverUtil = require('minecraft-server-util')

app.use(morgan('combined'))
app.use(helmet())
app.use(cors({origin: '*'}))

app.get('/', (req, res) => {
  res.json({
    status: '/status'
  })
})

app.get('/status', async (req, res) => {
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
})

app.listen(port, () => {
  console.log(`MCQuery is running on :${port}`)
})
