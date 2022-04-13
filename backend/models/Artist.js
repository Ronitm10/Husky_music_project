const mongoose = require('mongoose')

const artistSchema = new mongoose.Schema({
    test: String ,
    data: String
});

const Test = mongoose.model('Artist', artistSchema);

module.exports = Test