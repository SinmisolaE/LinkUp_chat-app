
const socket = io('https://linkup-chat-app.onrender.com');
const rooms = document.getElementById('rooms');
const messagesDiv = document.getElementById('message')
const sendMessagebtn = document.getElementById('sendMessagebtn');
const messageInput = document.getElementById('messageInput');
let selected_room = null;
const username = localStorage.getItem('username');

console.log('entered chat interface');

const default_rooms = ["Education", "Business", "Games", "Sports", "Memes"];

default_rooms.forEach((room) => {
    const li = document.createElement('li');
    li.textContent = room
    li.onclick = () => {
        if (selected_room !== room) {
            messagesDiv.textContent = '';
        }
        selected_room = room;
        socket.emit('joinRoom', room);
        load_messages(room);
    }
    rooms.appendChild(li);
});

function load_messages(roomName) {
    fetch(`https://linkup-chat-app.onrender.com/chat/rooms/${roomName}/messages`)
    .then(response => response.json())
    .then(data => {
        messagesDiv.textContent = '';
        data.forEach((msg) => {
            const messageDiv = document.createElement('div');
            messageDiv.textContent = `${msg.sender}: ${msg.message}`;
            messagesDiv.appendChild(messageDiv);
        });
    }).catch(err => console.log(`Error loading message: ${err}`));
}

socket.on('userJoined', (room) => {
    // Show a message that a user has joined without reloading messages for everyone
    const joinMessage = document.createElement('div');
    joinMessage.textContent = `User ${username} has joined the room: ${room}`;
    messagesDiv.appendChild(joinMessage);
});


socket.on('newMessage', (data) => {
    const {sender, message} = data;
    const single_messageDiv = document.createElement('div');
    single_messageDiv.textContent = `${sender}: ${message}`;
    messagesDiv.appendChild(single_messageDiv);
})

sendMessagebtn.onclick = () => {
    const message = messageInput.value;
    if (message && selected_room) {
        socket.emit('sendMessage', {
            message,
            roomName: selected_room,
            sender: username,
        });
        messageInput.value = '';
    }
}