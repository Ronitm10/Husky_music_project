const albumRouter = require('express').Router()
const Album = require('../models/Album')
var mongoose = require('mongoose')
const multer = require('multer')
const cloudinary = require('cloudinary').v2;
var path = require('path');
const { response } = require('express')
var bodyParser = require('body-parser')

const idConvertor = mongoose.Types.ObjectId

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
    }
})
const upload = multer({ storage: storage });
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
            albumArtURL: req.body.albumArtURL,
            genre: req.body.genre
        })
        const response = await album.save();
        res.json(response)
    }
    catch (err) {
        console.error("Failed to create album", err);
        res.sendStatus(400);
    }
})
albumRouter.post("/albumCover", upload.single('cover'), async (req, res) => {
    try {

        const cover = req.file;
        console.log('trying to create image', cover)
        let upload_response = await cloudinary.uploader.upload(cover.path,
            { resource_type: "image" });
        const coverUrl = upload_response.secure_url;
        res.json({ url: coverUrl })

    }
    catch (error) {
        console.error('Uploading cover failed', error);
    }
})


module.exports = albumRouter
