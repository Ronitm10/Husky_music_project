const albumRouter = require('express').Router()
const Album = require('../models/Album')
var mongoose = require('mongoose')

const { response } = require('express')
var bodyParser = require('body-parser')

const idConvertor = mongoose.Types.ObjectId
//try {
albumRouter.get('/getAll', async (req, res) => {
    try {
        const albums = await Album.find({}).populate('tracks').populate('artist');
        return res.json(albums);
    }
    catch (err) {
        console.error("Error fetching albums: ", err);
    }
})

albumRouter.get('/find/:id', async (req, res) => {
    try {
        console.log("Album id is", req.params.id);
        const album = await Album.findById(idConvertor(req.params.id)).populate('tracks').populate('artist');
        res.json(album)
    }
    catch (err) {
        res.send(400)
        console.error("Error getting album by ID: ", err);
    }
})

albumRouter.get('/findByArtist/:id', async (req, res) => {
    try {
        console.log("Album id is", req.params.id);
        const album = await Album.find({ artist: idConvertor(req.params.id) }).populate('tracks').populate('artist');
        res.json(album)
    }
    catch (err) {
        res.send(400)
        console.error("Error getting album by ID: ", err);
    }
})

albumRouter.post('/create', async (req, res) => {
    try {
        const album = new Album({
            artist: idConvertor(req.body.artist),
            tracks: req.body.tracks.map(a => idConvertor(a)),
            name: req.body.name,
            albumArtURL: req.body.albumArt,
            genre: req.body.genre
        })
        const response = await album.save();
        res.json(response)
    }
    catch (err) {
        console.error("Failed to create album", err);
    }
})

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


module.exports = albumRouter
