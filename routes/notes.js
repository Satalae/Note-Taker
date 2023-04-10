const notes = require('express').Router();
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

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

module.exports = notes;