const express = require('express')
const socketio = require('socket.io')
const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res)=>{
    res.render('index')
})

const server = app.listen(process.env.PORT || 3000, ()=>{
    console.log("server is running")
})

const io = socketio(server, {'transports': ['websocket', 'polling'], allowEIO3: true})

io.on('connection', socket=> {
    console.log('new user connected')

    socket.username = "Anonymous"

    socket.on('change_username', data => {
        socket.username = data.username
    })

    socket.on('new_message', data => {
        io.sockets.emit('receive_message', {message: data.message, username: socket.username})
    })
})