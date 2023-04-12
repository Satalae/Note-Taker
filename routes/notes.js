const notes = require('express').Router();
const { readAndAppend, readFromFile, readAndDelete } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');

//GET route for prior notes
notes.get('/', (req, res) => 
    readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)))
);

// POST route for new notes
notes.post('/', (req, res) => {
    const { title, text } = req.body;
    
    if( title && text ) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };

        readAndAppend(newNote, './db/notes.json');

        const response = {
            status: 'success',
            body: newNote,
        };

        res.json(response);
    } else {
        res.json('Unable to post note');
    }
});

// DELETE Route to delete saved notes
notes.delete('/:id', (req, res) => {
    // Gets the ID of the requested note deletion
    const pulledID = req.params.id;
    
    if( pulledID ){
        
        readAndDelete(pulledID, './db/notes.json');

        const response = {
            status: 'success',
            body: pulledID,
        };

        res.json(response);
    }else {
        res.json('Unable to find or delete requested note.');
    }
});

module.exports = notes;