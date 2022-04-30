const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    role: String,
    premium: Boolean,
    likedTracks: [{
        type: Schema.Types.ObjectId,
        ref: 'Track'
    }]
});

const User = mongoose.model('User', userSchema);

module.exports = User