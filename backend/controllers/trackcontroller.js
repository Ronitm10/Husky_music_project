const trackRouter = require('express').Router();
const Test = require('../models/Test')
const Track = require('../models/Track')
const cloudinary = require('cloudinary').v2;
const auth = require('../middleware/auth');
const multer = require('multer');
var path = require('path');
const mongoose = require('mongoose')
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

trackRouter.post("/create", upload.single('track'), async (req, res) => {
    console.log('form body', req.body.trackName);
    const track = req.file;
    if (!track || !track.mimetype.includes('audio')) return res.status(400).send({ error: "Invalid track/format" });

    try {
        //Upload to cloudinary
        let upload_response = await cloudinary.uploader.upload(track.path,
            { resource_type: "video" });

        const trackObj = new Track();
        trackObj.trackUrl = upload_response.secure_url;
        trackObj.trackName = req.body.trackName;
        await trackObj.save();

        // Remove files from server
        fs.unlink(req.file.path, (err) => {
            if (err) console.error('unlink failed', err);
            else console.log('upload complete. File deleted');
        });
        return res.send(trackObj);
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
