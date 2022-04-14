const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    uname: String ,
    pass: String, 
    role: String
});

const User = mongoose.model('User', userSchema);

module.exports = User