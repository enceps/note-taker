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

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});