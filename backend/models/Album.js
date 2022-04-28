const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const albumSchema = new mongoose.Schema({
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'Artist'
    },
    tracks: [{
        type: Schema.Types.ObjectId,
        ref: 'Track'
    }],
    name: String,
    releaseYear: Date,
    albumArtURL: String,
    genre: String,
});

const Album = mongoose.model('Album', albumSchema);

module.exports = Album