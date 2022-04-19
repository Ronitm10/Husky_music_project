const trackRouter = require('express').Router();
const Test = require('../models/Test')
const Track = require('../models/Track')
const cloudinary = require('cloudinary').v2;
const auth = require('../middleware/auth');
const multer = require('multer');
var path = require('path');
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



trackRouter.post("/", upload.single('track'), async (req, res) => {
    console.log('form body', req.body.trackName);
    const track = req.file;
    if (!track || !track.mimetype.includes('audio')) return res.status(400).send({ error: "Invalid track/format" });

    try {
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

module.exports = trackRouter