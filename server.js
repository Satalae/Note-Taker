// Global Tools
const express = require('express');
const path = require('path');
const api = require('./routes/index.js');

const app = express();

// Heroku/Port
const PORT = process.env.port || 3001;

// Static Path to html/js
app.use(express.static('public'));

// Custom middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

// GET Routes
app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Listener
app.listen(PORT, () => 
    console.log(`Now listening on http://localhost:${PORT} :)`)
);