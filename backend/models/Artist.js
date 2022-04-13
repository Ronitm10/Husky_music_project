const mongoose = require('mongoose')

const artistSchema = new mongoose.Schema({
    test: String ,
    data: String
});

const Art = mongoose.model('Artist', artistSchema);

module.exports = Artist