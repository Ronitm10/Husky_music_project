const playlistRouter = require('express').Router()
const Test = require('../models/Test')
const Playlist = require('../models/Playlist')
const cloudinary = require('cloudinary').v2
const auth = require('../middleware/auth')
const multer = require('multer')
var path = require('path')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
    },
})
const upload = multer({ storage: storage })
const fs = require('fs')

// Create Playlist Name
playlistRouter.post('/createPlaylist', (req, res) => {
    try {
        console.log(req.body.name)
        const playlist = new Playlist({
            name: req.body.name,
            // trackList: [],
            user: req.body.user,
        })
        playlist.save((err, data) => {
            res.status(200).json({
                code: 200,
                message: 'Playlist Creation Successful',
                create: data,
            })
        })
    } catch (err) {
        console.error('Could create Playlist', err)
    }
})

// Delete a playlist
playlistRouter.delete('/delete', (req, res) => {
    try {
        const id = req.body.id

        Playlist.findByIdAndRemove(id, (err, data) => {
            if (!err) {
                res.status(200).json({
                    code: 200,
                    message: 'Playlist Deleted Successfully',
                    delPlaylist: data,
                })
            }
        })
    } catch (err) {
        console.error('Could not delete Playlist', err)
    }
})

module.exports = playlistRouter
