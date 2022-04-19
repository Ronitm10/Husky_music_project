const mongoose = require('mongoose')

const trackSchema = new mongoose.Schema({
    //album -> Artist
    trackName: String,
    trackDuration: Number,
    album: String,
    playCount: Number,
    likeCount: Number,
    trackUrl: String
});

const Track = mongoose.model('Track', trackSchema);

module.exports = Track