const socket = io.connect('http://localhost:8081');

socket.on('signal', data => {
    console.log(data)
})
