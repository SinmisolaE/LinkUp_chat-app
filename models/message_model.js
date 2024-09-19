const { default: mongoose } = require('mongoose');
const Schema = mongoose.Schema;

const MessageModel = new Schema({
    message: {
        type: String,
        required: true,
    },

    roomName: {
        type: String,
        required: true,
    },

    sender: {
        type: String,
        required: true,
    },

    created_at: {
        type: Date,
        default: Date.now,
    }
})

const Message = mongoose.model('Message', MessageModel);

module.exports = Message;