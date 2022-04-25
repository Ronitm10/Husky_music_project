const mongoose = require('mongoose')

//import Album from './Album'
//import User from './User'
//import Track from './Track';

const artistSchema = new mongoose.Schema({
    name: String,
    bio: String,
  // album: Album,
   album: String,
  //  topPlayedTracks: [Track],
   topPlayedTracks: [String],
   // user: User
   user: String
});



const Artist = mongoose.model('artist', artistSchema);


module.exports = Artist
