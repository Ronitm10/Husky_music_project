const config = require('config')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = require('express').Router()

const User = require('../models/User')

module.exports = function(req, res, next) {
    const token = req.header('x-auth-token'); //get token from header

    if(!token) return res.status(401).json({ msg: 'No token. Auth denied'});

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        req.user = decoded.user;
        next();
    }
    catch(err) {
        res.status(401).json({ msg : 'Invalid Token '});
    }
}

