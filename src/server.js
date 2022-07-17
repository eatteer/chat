const { createServer } = require('http')
const express = require('express')
const { Server } = require('socket.io')
const path = require('path')

const PORT = process.env.PORT || 5000

/* works as a function handler for http server */
const app = express()

/* create http server */
const server = createServer(app)

/* create websocket server */
const io = new Server(server)

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

io.on('connection', (socket) => {
  io.emit('chatMessage', 'BotMelito: User entered the chat')

  socket.on('chatMessage', (value) => {
    io.emit('chatMessage', value)
  })

  socket.on('disconnect', () => {
    io.emit('chatMessage', 'BotMelito: User left the chat')
  })
})

server.listen(PORT, () => {
  console.log(`running server on port ${PORT}`)
})