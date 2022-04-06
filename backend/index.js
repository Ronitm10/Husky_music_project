
const app = require('./server');
const PORT = 3000
const mongoose = require('mongoose')
const express = require('express')
app.use(express.static('build'))

app.listen(PORT, () => {
  console.log(`App is up and running on:${PORT}`);
});