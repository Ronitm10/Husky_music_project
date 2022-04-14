const testRouter = require('express').Router();
const Test = require('../models/Test')

testRouter.get("/test", async (req, res) => {
    const objects = await Test.find({})
    res.status(200).json(objects)
    
})

module.exports = testRouter