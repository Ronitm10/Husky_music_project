const artistRouter = require('express').Router();
const Artist = require('../models/Artist');
var mongoose = require('mongoose');
const multer = require('multer')
const cloudinary = require('cloudinary').v2;
var path = require('path');

const { response } = require('express');
var bodyParser = require('body-parser');

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

artistRouter.get("/getAll", async (req, res) => {
  try {
    const artists = await Artist.find({}).populate('albums');
    res.json(artists)
  }
  catch (error) {
    console.error("Error fetching artists", error);
  }
})

artistRouter.get("/find/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const idObj = idConvertor(id);
    const artist = await Artist.findById(idObj).populate('user');
    if (!artist) {
      return res.status(401).send({ msg: "Artist not found" });
    }
    return res.json(artist);
  }
  catch (err) {
    console.error("error fetching artist");
  }
})
artistRouter.get("/findByUser/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log('id im searching for is', id);
    const idObj = idConvertor(id);
    const artist = await Artist.findOne({ user: id }).populate('user');
    if (!artist) {
      return res.status(401).send({ msg: "Artist not found" });
    }
    return res.json(artist);
  }
  catch (err) {
    console.error("error fetching artist");
  }
})
//Create Artist

artistRouter.post('/create', upload.single('pic'), async (req, res) => {
  try {
    console.log("artist", req.body);
    const pic = req.file;
    let upload_response = await cloudinary.uploader.upload(pic.path,
      { resource_type: "image" });
    const coverUrl = upload_response.secure_url;
    const artist = new Artist({
      name: req.body.name,
      bio: req.body.bio,
      user: idConvertor(req.body.user),
      pic: coverUrl
    });
    const response = await artist.save();
    res.json(artist)
  }
  catch (err) {
    console.error("Artist creation failed", err);
  }

});


//Delete an artist
artistRouter.delete('/deleteArtist', (req, res) => {
  const id = req.body.id;

  var idObj = idConvertor(id);
  //console.log(id);
  Artist.findByIdAndRemove(id, (err, data) => {
    if (!err) {
      res.status(200).json({ code: 200, message: "Artist deleted successfully", delUser: data });

    }
  });
});



// Update an artist

artistRouter.post('/updateArtist', async (req, res) => {

  const id = req.body.id;

  Artist.findByIdAndUpdate(id, {
    $set: {
      name: req.body.name
    }
  }, (err, data) => {
    if (!err) {
      res.status(200).json({ code: 200, message: "Artist updated successfully", updateUsr: data });

    } else {
      console.log(err);
    }
  });
})


module.exports = artistRouter