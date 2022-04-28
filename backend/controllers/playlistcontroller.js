const playlistRouter = require('express').Router()
var mongoose = require('mongoose')
const Playlist = require('../models/Playlist')
const idConvertor = mongoose.Types.ObjectId

// Create Playlist Name
playlistRouter.post('/createPlaylist', (req, res) => {
    try {
        console.log(req.body.name)
        const playlist = new Playlist({
            name: req.body.name,
            tracks: req.body.tracks.map((a) => idConvertor(a)),
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

//Get all playlist
playlistRouter.get('/getAll', async (req, res) => {
    try {
        const playlists = await Playlist.find({}).populate('tracks')
        res.json(playlists)
    } catch (err) {
        console.error('Error fetching playlists: ', err)
    }
})

// Find by id
playlistRouter.get('/find/:id', async (req, res) => {
    try {
        console.log('Playlist id is', req.params.id)
        const playlist = await Playlist.findById(
            idConvertor(req.params.id)
        ).populate('tracks')
        res.json(playlist)
    } catch (err) {
        res.send(400)
        console.error('Error getting playlist by ID: ', err)
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

// Update a playlist
playlistRouter.put('/updatePlaylist', (req, res) => {
    try {
        const id = req.body.id

        Playlist.findByIdAndUpdate(
            id,
            {
                $set: {
                    name: req.body.name,
                },
            },
            (err, data) => {
                if (!err) {
                    res.status(200).json({
                        code: 200,
                        message: 'Playlist updated successfully',
                        updateUsr: data,
                    })
                }
            }
        )
    } catch (err) {
        console.log('Could not update Playlist', err)
    }
})

module.exports = playlistRouter
