const mongoose = require('mongoose')

const testSchema = new mongoose.Schema({
    test: {
        type: String
    },
    data: String
});

const Test = mongoose.model('Test', testSchema);


module.exports = Test