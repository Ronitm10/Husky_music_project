const mongoose = require('mongoose')

const albumSchema = new mongoose.Schema({
    Artist: String,
    //list of tracks
    albumName: String,
    releaseYear: Date,
    totalRunDuration: Number,
    albumArt: String,
    genre: String,
});

const Album = mongoose.model('Album', albumSchema);

module.exports = Album