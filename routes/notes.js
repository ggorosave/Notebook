const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
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
notes.post('/', (res, req) => {

    // destructering the items in req.body
    const { title, text } = req.body

    // Checks for the required properties
    if (title && text) {
        const newNote = {
            title,
            test,
            id: uuidv4(),
        }

        fs.appendFile('./db/db.json', newNote, (error) =>
        error ? console.error(error) : console.log('New note added to database!'))

        const response = {
            status: 'success',
            body: newNote,
        };

        res.json(response);
    } else {
        res.json('Error in posting note')
    }
});

module.exports = notes;