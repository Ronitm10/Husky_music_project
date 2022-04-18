require('dotenv').config();
const cors = require('cors')
const express = require('express');
const db = require('./models/db');
const testRouter = require('./controllers/testcontroller');
const userRouter = require('./controllers/usercontroller');

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", testRouter);
app.use("/users", userRouter);



module.exports = app