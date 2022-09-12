//required npm's paths files etc
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const fs = require('fs');
const path = require('path');
const  notes  = require('./db/db.json')
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


//get array
app.get('/api/notes', (req,res) => {
    let results = notes;
    console.log(req.query)
    res.json(results.slice(1));
    console.log(notes)
});


// get notes by ID
app.get('api/notes/:id', (req,res) => {
    const result = findById(req.params.id, notes);
    if (result) {res.json(result);
    } else {
        res.send(404);
    }
});

//get pages when server starts
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});



// make a new note and store it in array
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

// function findById(id, notesArray) {
//     const result=notesArray.filter(notes => notes.id === id)[0];
//     return result;
// };



//Delete Notes from array
function deleteNote(id, notesArray) {
    for (let i = 0; i < notesArray.length; i++) {
        let note = notesArray[i];

        if (note.id == id) {
            notesArray.splice(i, 1);
            fs.writeFileSync(
                path.join(__dirname, './db/db.json'),
                JSON.stringify(notesArray, null, 2)
            );

            break;
        }
    }
}

app.delete('/api/notes/:id', (req, res) => {
    deleteNote(req.params.id, notes);
    res.json(true);
});

// Start server

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});