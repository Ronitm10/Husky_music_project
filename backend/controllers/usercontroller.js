const userRouter = require('express').Router()
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const config = require('config')
const idConvertor = mongoose.Types.ObjectId

const User = require('../models/User')
userRouter.post(
    '/',
    [
        check('firstName', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check(
            'password',
            'Please enter a password with 6 or more characters'
        ).isLength({ min: 6 }),
    ],
    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            console.log(errors)
            return res.status(400).json({ errors: errors.array() })
        }
        const { firstName, lastName, email, password, role } = req.body
        try {
            let user = await User.findOne({ email })
            if (user) {
                return res.status(400).json({
                    error: 'This email is taken!'
                })
            }
            user = new User({
                firstName,
                lastName,
                email,
                password,
                role
            })
            const salt = await bcrypt.genSalt(10)

            user.password = await bcrypt.hash(password, salt)

            await user.save()
            return res.json({ msg: "User successfully created" })

        } catch (err) {
            res.status(400).json({ error: err })
            console.error('oh crap user creation failed', err)
        }
    }
)

userRouter.get('/find/:id', async (req, res) => {
    try {
        console.log("User id is", req.params.id);
        const user = await User.findById(idConvertor(req.params.id)).populate('likedTracks');
        console.log('Got user', user);
        return res.json(user)
    }
    catch (err) {
        res.send(400)
        console.error("Error getting User by ID: ", err);
    }
})

userRouter.post('/updateLikes/:id', async (req, res) => {
    try {
        console.log("body for upodate likes", req.body)
        const user = await User.findById(idConvertor(req.params.id)).populate('likedTracks');
        user.likedTracks = req.body.likedTracks;
        await user.save();
        console.log('Updated likes backend')
        return res.json(user)
    }
    catch (err) {
        console.error("Updating likes failed", err);
        return res.sendStatus(400);

    }
})

userRouter.delete('/delete/:id', (req, res) => {
    try {
        const id = req.params.id

        User.findByIdAndRemove(id, (err, data) => {
            if (!err) {
                res.status(200).json({
                    code: 200,
                    message: 'User deleted successfully',
                    delUser: data,
                })
            }
        })
    } catch (err) {
        console.error('Could not delete Track', err)
    }
})
artistRouter.get("/getAll", async (req, res) => {
    try {
      const user = User.find({});
      res.json(user)
    }
    catch (error) {
      console.error("Error fetching artists", error);
    }
  })


module.exports = userRouter
