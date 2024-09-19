const express = require('express');
const http = require('http');
const path = require('path');
const mongoose = require('mongoose');
const Socketio = require('socket.io');
const authRoute = require('./routes/authRoute');
const roomRoute = require('./routes/roomRoute');
const socketConnection = require('./socket/socketConnection');
const app = express();

const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

const io = Socketio(server);

const mongoUrl = 'mongodb+srv://Sinmisola:Sinmi123@cluster0.orsws.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology:  true,
})
.then(() => {console.log('MongoDBconnected...')})
.catch((err) => {console.log(err)});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoute);
app.use('/chat', roomRoute);

socketConnection(io);

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});