const socket = io.connect('http://localhost:8081');

socket.on('signal', (pulseObj) => {
    console.log('DATA', pulseObj)
    pulse = pulseObj
})

let pulse = {}