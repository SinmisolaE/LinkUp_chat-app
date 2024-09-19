const { disconnect } = require("mongoose");
const Message = require("../models/message_model");

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('User connected');

        socket.on('joinRoom', (roomName) => {
            socket.join(roomName);
            console.log('User joined');

            socket.broadcast.to(roomName).emit('message', `User ${socket.id} has joined the room: ${roomName}`);
        });

        socket.on('sendMessage', async (data) => {
            console.log('entere sendMessage');
            const {message, roomName, sender} = data;
            const msg = await new Message({message, roomName, sender});
            try {

                await msg.save();
                io.to(roomName).emit('newMessage', {sender, message});
            } catch(err) {
                console.log(`Error sending message: ${err}`);
            };
        });
        socket.on('disconnect', () => {
            console.log('User has left the room');
            socket.broadcast.emit('message', `User ${socket.id} left the room`);
        });
    })
}