const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const SerialPort = require('serialport')
const readLine = require('readline')
const usbPort = '/dev/cu.usbmodem14201'         // Reset the value of this variable to the name of the port your arduino is connected to
const port = new SerialPort(usbPort)
const { processPulse } = require('./serial.js')

app.use(express.static('public'))

// listening for connection to front end
io.on('connection', (socket) => {
  console.log('A user connected')
  const lineReader = connectUSB()
  // this is the input from port, from createInterface
  lineReader.on('line', line => { 
    const lineArr = line.split(',')
    const beat = processPulse(line)
    io.sockets.emit('signal', beat)
    console.log(beat)
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
