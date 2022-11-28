const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const app = require('.');
const { json } = require('express');


// GET route for retrieving all data
notes.get('/', (req, res) => {

    fs.readFile('./db/db.json', 'utf8', (error, data) => {
        error ? console.error(error) : res.json(JSON.parse(data))
    });

});

// Route for submitting notes
notes.post('/', (req, res) => {

    // destructering the items in req.body
    const { title, text } = req.body;

    // Checks for the required properties
    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        }


        fs.readFile('./db/db.json', 'utf8', (error, data) => {
            if (error) {
                console.error(error);
            } else {
                const parsedData = JSON.parse(data);
                parsedData.push(newNote);
                
                fs.writeFile('./db/db.json', JSON.stringify(parsedData, null, 4), (error) => error ? console.log(error) : console.log('New note added'))

            }
        });

        const response = {
            status: 'success',
            body: newNote,
        };

        res.json(response);
    } else {
        res.json('Error in posting note')
    }
});

// Route for deleting notes
notes.delete('/:id', (req, res) => {
    const noteId = req.params.id;
    
    fs.readFile('./db/db.json', 'utf8', (error, data) => {
        if (error) {
            console.error(error);
        } else {
           const parsedData = JSON.parse(data);
           const result = parsedData.filter((note) => note.id !== noteId);
  
           fs.writeFile('./db/db.json', JSON.stringify(result, null, 4), (error) => error ? console.log(error) : console.log(`Note deleted`));
  
           res.json(`Note ${noteId} has been deleted`)
        }
  
    });
  
  });
  
module.exports = notes;