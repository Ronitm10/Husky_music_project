const userRouter = require('express').Router()
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')

const User = require('../models/User')
userRouter.post(
    '/',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check(
            'password',
            'Please enter a password with 6 or more characters'
        ).isLength({ min: 6 }),
    ],
    async (req, res) => {
        const errors = validationResult(req)

        console.log(errors)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const { name, email, password } = req.body
        try {
            let user = await User.findOne({ email })

            if (user) {
                res.status(400).json({
                    errors: [{ msg: 'User already exists' }],
                })
            }

            user = new User({
                name,
                email,
                password,
            })
            const salt = await bcrypt.genSalt(10)

            user.password = await bcrypt.hash(password, salt)

            await user.save()

            const payload = {
                user: {
                    id: user.id,
                },
            }

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 360000 },
                (err, token) => {
                    if (err) throw err
                    res.json({ token })
                }
            )

        } catch (err) {
            console.error('oh crap user creation failed', err)
        }
    }
)

module.exports = userRouter
