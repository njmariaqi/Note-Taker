const fs = require('fs');
const express = require('express');
const path = require('path');
const PORT = process.env.port || 3001;
const app = express();
const notes = require('./db/db.json');
const uuid = require('uuid');


app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
     res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/notes', (req, res) => {
     res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('/api/notes', (req, res) => {
     return res.json(notes);
});

app.post('/api/notes', (req, res) => {
     
     const {title, text} = req.body;
     if (title && text) {
          const newNote = {
               title,
               text,
               id: uuid.v1()
          }
          console.log(newNote);
     }
});



app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`));