const mongoose = require('mongoose')
const Schema = mongoose.Schema

const artistSchema = new mongoose.Schema({
  name: String,
  bio: String,
  albums: [{
    type: Schema.Types.ObjectId,
    ref: 'Album'
  }],
  topPlayedTracks: [String],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  pic: String
});



const Artist = mongoose.model('Artist', artistSchema);


module.exports = Artist
