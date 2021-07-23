(function connect(){
    let socket = io.connect('http://localhost:3000')

    let username = document.querySelector('#username')
    let usernameBtn = document.querySelector('#usernameBtn')
    let curUsername = document.querySelector('.card-header')

    let message = document.querySelector('#message')
    let messageBtn = document.querySelector('#messageBtn')
    let messageList = document.querySelector('#message-list')
    
    usernameBtn.addEventListener('click', e => {
        socket.emit('change_username', {username: username.value})
        curUsername.textContent = username.value
        username.value = ''
    })

    messageBtn.addEventListener('click', e => {
        socket.emit('new_message', {message: message.value})
        message.value = ''
    })

    socket.on('receive_message', data => {
        console.log(data)
        let listItem = document.createElement('li')
        listItem.textContent = data.username + ': ' + data.message
        listItem.classList.add('list-group-item')
        messageList.appendChild(listItem)
    })

})()