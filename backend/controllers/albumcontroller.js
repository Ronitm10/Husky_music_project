const albumRouter = require('express').Router()
const Album = require('../models/Album')
var mongoose = require('mongoose')
const { response } = require('express')
var bodyParser = require('body-parser')

const idConvertor = mongoose.Types.ObjectId
//try {
    albumRouter.get('/getAll', async (req, res) => {
        Album.find({}, (err, data) => {
            if (!err) {
                res.send(data)
            } else {
                console.log(err)
            }
        })
    })
//} catch (err) {
   // console.error('Could not get all Albums', err)
//}

try {
    albumRouter.post('/create', (req, res) => {
        console.log(req.body.name)
        const album = new Album({
            artist: req.body.album,
            albumName: req.body.albumName,
            releaseYear: req.body.releaseYear,
            totalRunDuration: req.body.totalRunDuration,
            albumArt: req.body.albumArt,
            genre: req.body.genre,
        })
        album.save((err, data) => {
            res.status(200).json({
                code: 200,
                message: 'Album creation successful',
                create: data,
            })
        })
    })
} catch (err) {
    console.error('Could create Albums', err)
}

try {
    albumRouter.delete('/deleteAlbum', (req, res) => {
        const id = req.body.id

        var idObj = idConvertor(id)

        Album.findByIdAndRemove(id, (err, data) => {
            if (!err) {
                res.status(200).json({
                    code: 200,
                    message: 'Album deleted successfully',
                    delUser: data,
                })
            }
        })
    })
} catch (err) {
    console.error('Could not delete Albums', err)
}

try {
    albumRouter.put('/updateAlbum', (req, res) => {
        const id = req.body.id

        Album.findByIdAndUpdate(
            id,
            {
                $set: {
                    albumName: req.body.albumName,
                },
            },
            (err, data) => {
                if (!err) {
                    res.status(200).json({
                        code: 200,
                        message: 'Album updated successfully',
                        updateUsr: data,
                    })
                } else {
                    console.log(err)
                }
            }
        )
    })
} catch (err) {
    console.error('Could update Albums', err)
}

module.exports = albumRouter
