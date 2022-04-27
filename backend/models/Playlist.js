const mongoose = require('mongoose')

const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
    },
    trackList: {
        type: [String],
    },
    user: {
        type: String,
        required: true,
    },
})

const Playlist = mongoose.model('Playlist', playlistSchema)

module.exports = Playlist
