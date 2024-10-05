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

const mongoUrl = process.env.MONGO_URL;

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