const mongoose = require('mongoose')

const Album = mongoose.model('Album', albumSchema);

module.exports = Album