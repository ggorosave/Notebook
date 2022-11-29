const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

// GET route for retrieving all data
notes.get('/', (req, res) => {

    // reads json file and returns parsed data to client
    fs.readFile('./db/db.json', 'utf8', (error, data) => {
        error ? console.error(error) : res.json(JSON.parse(data))
    });

});

// Route for submitting notes
notes.post('/', (req, res) => {

    // destructering the items in req.body
    const { title, text } = req.body;

    // Checks for the required properties, title and text
    if (title && text) {

        // Creates a new object for the note and uses uusid to assign it a unique id
        const newNote = {
            title,
            text,
            id: uuidv4(),
        }

        // Calls the fs method to read the file 
        fs.readFile('./db/db.json', 'utf8', (error, data) => {
            if (error) {
                console.error(error);
            } else {
                // parses data from json file (should be an array)
                const parsedData = JSON.parse(data);

                // pushes new note into array of data
                parsedData.push(newNote);
                
                // Rewrites the file using the data with the new note. The '4' in the stringify method indicates that there should be 4 tabs after every property so it renders nicely in the file.
                fs.writeFile('./db/db.json', JSON.stringify(parsedData, null, 4), (error) => error ? console.log(error) : console.log('New note added'));

            }
        });

        // builds a response object to send to the client
        const response = {
            status: 'success',
            body: newNote,
        };

        // sends response to the client
        res.json(response);
    } else {

        // sends an error to the client if required properties don't exist
        res.json('Error in posting note')
    }
});

// Route for deleting notes
notes.delete('/:id', (req, res) => {

    // variable that has the value of the parameter id
    const noteId = req.params.id;
    
    // retrieves data from json file
    fs.readFile('./db/db.json', 'utf8', (error, data) => {
        if (error) {
            console.error(error);
        } else {
            // parses the data from the json file
           const parsedData = JSON.parse(data);

            // creates a new array that filters out the note with the given id 
           const result = parsedData.filter((note) => note.id !== noteId);
  
            // rewrites the json file without the delted note
           fs.writeFile('./db/db.json', JSON.stringify(result, null, 4), (error) => error ? console.log(error) : console.log(`Note deleted`));
            
            // sends response to client
           res.json(`Note ${noteId} has been deleted`)
        }
  
    });
  
  });
  
module.exports = notes;