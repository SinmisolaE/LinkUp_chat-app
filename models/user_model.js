const { mongoose } = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
   

    username: {
        type: String,
        unique: true,
        required: true

    },

    hashed_password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },

    created_at: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;