const userRouter = require('express').Router()
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')

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

module.exports = userRouter
