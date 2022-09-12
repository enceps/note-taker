const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const fs = require('fs');
const path = require('path');

const  notes  = require('./db/db.json')


app.get('/api/notes', (req,res) => {
    let results = notes;
    console.log(req.query)
    res.json(results);
    console.log(notes)
});

app.get('api/notes/:id', (req,res) => {
    const result = findById(req.params.id, notes);
    if (result) {res.json(result);
    } else {
        res.send(404);
    }
});

function findById(id, notesArray) {
    const result=notesArray.filter(notes => notes.id === id)[0];
    return result;
};

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});