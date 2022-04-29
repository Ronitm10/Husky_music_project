const trackRouter = require('express').Router();
const Test = require('../models/Test')
const Track = require('../models/Track')
const cloudinary = require('cloudinary').v2;
const auth = require('../middleware/auth');
const multer = require('multer');
var path = require('path');
const mongoose = require('mongoose')
const fsExtra = require('fs-extra')
const idConverter = mongoose.Types.ObjectId
//Uploads will be labelled with their extension here
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
    }
})


const upload = multer({ storage: storage });
const fs = require('fs')

trackRouter.post("/create", upload.array('tracks'), async (req, res) => {
    const tracks = req.files;
    for (let i = 0; i < tracks.length; i++) {
        if (!tracks[i].mimetype.includes('audio')) {
            return res.status(400).send({ error: "Not a valid audio format" });
        }
    }
    try {
        //Upload to cloudinary
        const trackRes = await Promise.all(tracks.map(async (track) => {
            let upload_response = await cloudinary.uploader.upload(track.path,
                { resource_type: "video" });

            const trackObj = new Track();
            let minutes = Math.floor(upload_response.duration / 60);
            let seconds = Math.round(upload_response.duration % 60);
            console.log('time', minutes, seconds)
            trackObj.trackUrl = upload_response.secure_url;
            trackObj.trackName = req.body.trackName;
            trackObj.trackDuration = minutes + ":" + seconds;
            await trackObj.save();
            return trackObj;
        }))
        res.json(trackRes);
        // Remove files from server
        fsExtra.emptyDir('./uploads');
        return;
    }
    catch (err) {
        console.error('Track upload failed', err);
    }
})


trackRouter.get("/getAll", async (req, res) => {
    try {
        const tracks = await Track.find({}).populate('album');
        res.json(tracks)
    }
    catch (err) {
        res.sendStatus(400)
        console.error('Cannot get all tracks', err)
    }
})

trackRouter.delete('/delete', (req, res) => {
    try {
        const id = req.body.id

        Track.findByIdAndRemove(id, (err, data) => {
            if (!err) {
                res.status(200).json({
                    code: 200,
                    message: 'Track deleted successfully',
                    delUser: data,
                })
            }
        })
    } catch (err) {
        console.error('Could not delete Track', err)
    }
})

trackRouter.put('/update', (req, res) => {
    try {
        const id = req.body.id

        Track.findByIdAndUpdate(
            id,
            {
                $set: {
                    trackName: req.body.trackName,
                    trackDuration: req.body.trackDuration,
                    playCount: req.body.playCount
                },
            },
            (err, data) => {
                if (!err) {
                    res.status(200).json({
                        code: 200,
                        message: 'Track updated successfully',
                        updateUsr: data,
                    })
                } else {
                    console.log(err)
                }
            }
        )
    } catch (err) {
        console.error('Could update Track', err)
    }
})

module.exports = trackRouter
