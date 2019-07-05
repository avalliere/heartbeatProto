const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.use(express.static('public'));

io.on('connection', function(socket){
  console.log('a user connected')
})

http.listen(8081, function(){
  console.log('listening on *:8081')
})