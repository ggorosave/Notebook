const express = require('express');

// imports router
const notesRouter = require('./notes');

const app = express();

app.use('/notes', notesRouter);

module.exports = app;