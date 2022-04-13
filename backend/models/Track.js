const mongoose = require('mongoose')

const trackSchema = new mongoose.Schema({
    ID: String,
    //album -> Artist
    trackName: String,
    trackDuration: Number,
    album: String,
    playCount: BigInt,
    likeCount: BigInt
});

const Track = mongoose.model('Track', trackSchema);

module.exports = Track