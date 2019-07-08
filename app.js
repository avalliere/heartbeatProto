const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const SerialPort = require('serialport')
const readLine = require('readline')
const usbPort = '/dev/cu.usbmodem14201'
const port = new SerialPort(usbPort)

app.use(express.static('public'))

// listening for connection to front end
io.on('connection', (socket) => {
  console.log('A user connected')
  const lineReader = connectUSB()
  // this is the input from port, from createInterface
  lineReader.on('line', line => { 
    console.log(line, " ------- ")
    io.sockets.emit('signal', line)
  })
})

http.listen(8081, () => {
  console.log('listening on *:8081')
})

// establishes connection to port
const connectUSB = () => { 
  let lineReader = readLine.createInterface({
    input: port
  })
  return lineReader
}
