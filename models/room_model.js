const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomModel = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },

    created_at: {
        type: Date,
        default: Date.now,
    },
});

const Rooms = mongoose.model('Rooms', RoomModel);
module.exports = Rooms;