const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const SerialPort = require('serialport')
const readLine = require('readline')
const usbPort = '/dev/cu.usbmodem14201'
const port = new SerialPort(usbPort)
const { processPulse } = require('./serial.js')

app.use(express.static('public'))

// listening for connection to front end
io.on('connection', (socket) => {
  console.log('A user connected')
  const lineReader = connectUSB()
  // this is the input from port, from createInterface
  lineReader.on('line', line => { 
    console.log(line, " ------- ")
    const lineArr = line.split(',')
    // ["0", "120"]
    // let obj = {}
        // obj.bpm = parseInt(lineArr[0])
        // obj.pulse = parseInt(lineArr[1])
        // obj.ibi = parseInt(lineArr[2])
    const beat = processPulse(line)
    io.sockets.emit('signal', beat)

    // without processing pulse for HRV
    // this will work but have to parse out the line
    // io.sockets.emit('signal', obj)
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
