require('dotenv').config();
const cors = require('cors')
const express = require('express');
const db = require('./models/db')
const testRouter = require('./controllers/testcontroller')
const app = express();

app.use(cors());
app.use(express.json({extended : false}));
app.use("/", testRouter);
app.use("/artist", require('./controllers/artistcontroller'));



module.exports = app