const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const fs = require('fs');
const path = require('path');
const  notes  = require('./db/db.json')
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/api/notes', (req,res) => {
    let results = notes;
    console.log(req.query)
    res.json(results.slice(1));
    console.log(notes)
});

app.get('api/notes/:id', (req,res) => {
    const result = findById(req.params.id, notes);
    if (result) {res.json(result);
    } else {
        res.send(404);
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});


function createNewNote(body, notesArray) {
    const newNote = body;
    if (!Array.isArray(notesArray))
        notesArray = [];
    
    if (notesArray.length === 0)
        notesArray.push(0);

    body.id = notesArray[0];
    notesArray[0]++;

    notesArray.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notesArray, null, 2)
    );
    return newNote;
};

app.post('/api/notes', (req,res) => {
const newNote = createNewNote(req.body, notes);
res.json(newNote);
});

function findById(id, notesArray) {
    const result=notesArray.filter(notes => notes.id === id)[0];
    return result;
};

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});