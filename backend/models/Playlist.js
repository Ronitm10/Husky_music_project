const mongoose = require('mongoose')
const Schema = mongoose.Schema
const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
    },
    tracks: [
        {
            type: Schema.Types.ObjectId, //??
            ref: 'Track',
        },
    ],
    user: {
        type: String,
        ref: 'User',
    },
})

const Playlist = mongoose.model('Playlist', playlistSchema)

module.exports = Playlist
