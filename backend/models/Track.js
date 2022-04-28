const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trackSchema = new mongoose.Schema({
    trackName: String,
    trackDuration: Number,
    album: {
        type: Schema.Types.ObjectId,
        ref: 'Album'
    },
    playCount: Number,
    likeCount: Number,
    trackUrl: String
});

const Track = mongoose.model('Track', trackSchema);

module.exports = Track