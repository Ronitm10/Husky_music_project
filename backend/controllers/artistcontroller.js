const artistRouter = require('express').Router();
const Artist = require('../models/Artist');
var mongoose = require('mongoose'); 
const { response } = require('express');
var bodyParser = require('body-parser');

const idConvertor = mongoose.Types.ObjectId

//To get all the users
artistRouter.get("/getAll", async (req, res) => {
   // const filter= {};
   
    Artist.find({}, (err, data) => {

        if(!err){
          res.send(data);
          //console.log(data);
        }
        else{
          console.log(err);
        }
      });
   
  //  const objects = await Artist.find({})
  //  res.status(200).json(objects)
    
})

//Get an artist by id
artistRouter.get("/getById", async (req, res) => {
    // const filter= {};
   //  const all= await Artist.find()
  //  console.log(all, ' hi');
  console.log(req.body);
    const id= req.body.id;

    var idObj = idConvertor(id);

    const artist = await Artist.findById(idObj);
    if(!artist){
      res.status(401).send({msg:"Artist not found"});
    }
    
    res.status(200).json(artist);

  //  Artist.findById(id, (err, data) => {
 
  //        if(!err){
  //          res.send(data);
  //       //  res.status(200).json({code:200, message:"Data fetched successfully", data});
  //          console.log(data);
  //        }
  //        else{
  //          console.log(err);
  //        }
  //      });
    
   //  const objects = await Artist.find({})
   //  res.status(200).json(objects)
     
 })



 
 

//Create Artist

artistRouter.post('/create',(req,res) => {

console.log(req.body.name);
  const artist = new Artist({
    name: req.body.name,
    bio: req.body.bio,

   album: req.body.album,

   topPlayedTracks: [],

   user: req.body.user
  });
  artist.save((err,data) =>{
    res.status(200).json({ code:200, message: "Artist creation successful", create: data});
  });
});


//Delete an artist
artistRouter.delete('/deleteArtist',(req,res) => {

  const id= req.body.id;

  var idObj = idConvertor(id);
//console.log(id);

          
  Artist.findByIdAndRemove(id, (err,data) => {
      if(!err){
        res.status(200).json({code:200, message:"Artist deleted successfully", delUser: data});
  
      }
    });
  
});



// Update an artist

artistRouter.post('/updateArtist',(req,res) => {

  const id= req.body.id;

  Artist.findByIdAndUpdate(id, { $set:{
    name: req.body.name
  }}, (err,data) => {
    if(!err){
      res.status(200).json({code:200, message:"Artist updated successfully", updateUsr: data});

    }else{
      console.log(err);
    }
  });
})


module.exports = artistRouter