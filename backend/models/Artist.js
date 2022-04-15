const mongoose = require('mongoose')

import Album from './Album'
import User from './User'
import Track from './Track';

const artistSchema = new mongoose.Schema({
    name: String ,
    bio: String,

    album: Album,
    //Waiting for track
    topPlayedTracks: String,
   
    user: User
});

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist
