const notes = require('express').Router();
const fs = require('fs');

// GET route for retrieving all data
notes.get('/', (res, req) => {
    fs.readFile('./db/db.json', 'utf8', (error, data) =>
    error ? console.error(error) : console.log(data))
    .then((data) => {
        res.json(JSON.parse(data));
    });
});

// Route for submitting notes