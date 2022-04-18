require('dotenv').config();
const cors = require('cors')
const express = require('express');
const db = require('./models/db');
const authRouter = require('./controllers/auth');
const userRouter = require('./controllers/usercontroller');

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);



module.exports = app