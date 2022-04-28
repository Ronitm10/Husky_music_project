const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator')
const auth = require('../middleware/auth');
const User = require('../models/User')
const bcrypt = require('bcrypt')
const config = require('config')
const jwt = require('jsonwebtoken')

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);

    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

//Auth user and get token
router.post(
    '/',
    [
        check('email',
            'Please include a valid email'
        ).isEmail(),
        check(
            'password',
            'Password is required'
        ).exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req)

        console.log(errors)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const { email, password } = req.body
        try {
            let user = await User.findOne({ email })

            if (!user) {
                return res.status(400).json({
                    errors: [{ msg: 'Invalid creds' }],
                })
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({
                    errors: [{ msg: 'Invalid creds' }],
                });
            }

            const payload = {
                user: {
                    id: user.id,
                    role: user.role
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
module.exports = router;