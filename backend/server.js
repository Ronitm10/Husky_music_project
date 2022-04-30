require('dotenv').config()
const cors = require('cors')
const express = require('express')
const db = require('./models/db')
const authRouter = require('./controllers/auth')
const userRouter = require('./controllers/usercontroller')
const trackRouter = require('./controllers/trackcontroller')
const albumRouter = require('./controllers/albumcontroller')
const playlistRouter = require('./controllers/playlistcontroller')
const artistRouter = require('./controllers/artistcontroller')
const stripeRouter = require('./controllers/stripe');

const cloudinary = require('cloudinary').v2
const config = require('config')

cloudinary.config({
    cloud_name: 'husky-music',
    api_key: config.get('cloudinaryAPIkey'),
    api_secret: config.get('cloudinaryAPIsecret'),
})
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())


app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use('/api/tracks', trackRouter)
app.use('/api/albums', albumRouter)
app.use('/api/playlists', playlistRouter)
app.use('/api/artists', artistRouter)
app.use('/api/premium', stripeRouter);

module.exports = app
