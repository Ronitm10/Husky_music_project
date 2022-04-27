const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const albumSchema = new mongoose.Schema({
    Artist: String,
    tracks: [{
        type: Schema.Types.ObjectId,
        ref: 'Track'
    }],
    albumName: String,
    releaseYear: Date,
    totalRunDuration: Number,
    albumArt: String,
    genre: String,
});

const Album = mongoose.model('Album', albumSchema);

module.exports = Album