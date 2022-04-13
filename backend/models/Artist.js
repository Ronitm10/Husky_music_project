const mongoose = require('mongoose')

const artistSchema = new mongoose.Schema({
    name: String ,
    bio: String,
    //Waiting for Album
    album: String,
    //Waiting for track
    topPlayedTracks: String,
     //Waiting for user
    user: String
});

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist
