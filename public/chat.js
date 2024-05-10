const output = document.getElementById('output');
const message = document.getElementById('message');
const send = document.getElementById('send');
const feedback = document.getElementById('feedback');
const roomMessage = document.querySelector('.room-message');
const users = document.querySelector('.users');


const socket = io.connect();


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const username = urlParams.get('username');
const roomname = urlParams.get('roomname').toLowerCase().trim();
roomMessage.innerHTML = `Connected in room ${roomname}`


document.addEventListener('DOMContentLoaded', async () => {
    try {
        const res = await fetch('/getMsg', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                roomname: roomname,
            })
        })
        const data = await res.json();

        data.forEach(function(err, index) {
            socket.emit('recall', {
                username: data[index].username,
                message: data[index].message,
                roomname: roomname
            });
        })    

    } catch (err) {
        console.log(err)
    }
})

socket.emit('joined-user', {
    username: username,
    roomname: roomname
})

send.addEventListener('click', async () => {
    try {
        const res = await fetch('/room/:id', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                content: message.value,
                room: roomname,
            })
        })
        
        if(res.status === 400 || res.status === 401) {
            return display.textContent = `${data.message}. ${data.error ? data.error : ''}`
        }
    } catch (err) {
        console.log(err)
    }
})

send.addEventListener('click', () =>{
    socket.emit('chat', {
        username: username,
        message: message.value,
        roomname: roomname
    })
    message.value = '';
})


message.addEventListener('keypress', () => {
    socket.emit('typing', {username: username, roomname: roomname})
})


socket.on('joined-user', (data)=>{
    output.innerHTML += '<p>--> <strong><em>' + data.username + ' </strong>has Joined the Room</em></p>';
})


socket.on('chat', (data) => {
    output.innerHTML += '<p><strong>' + data.username + '</strong>: ' + data.message + '</p>';
    feedback.innerHTML = '';
    document.querySelector('.chat-message').scrollTop = document.querySelector('.chat-message').scrollHeight

})


socket.on('typing', (user) => {
    feedback.innerHTML = '<p><em>' + user + ' is typing...</em></p>';
})


socket.on('online-users', (data) =>{
    users.innerHTML = ''
    data.forEach(user => {
        users.innerHTML += `<p>${user}</p>`
    });
})