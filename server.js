const fs = require('fs');
const express = require('express');
const path = require('path');
const PORT = process.env.port || 3001;
const app = express();
const notes = require('./db/db.json');
const uuid = require('uuid');
const util = require('util');


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

const readFile = util.promisify(fs.readFile);
// const writeNotes = (destination, content) => {
//      fs.writeFile(destination, JSON.stringify(content),(err) => err? console.log('success'):console.error(err))}


app.post('/api/notes', (req, res) => { 
     const {title, text} = req.body;
     if (title && text) {
          const newNote = {
               title,
               text,
               id: uuid.v1()
          }
          notes.push(newNote);
          fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => err? console.log('success'):console.error(err))
          readFile('./db/db.json')
          .then((data) => res.json(JSON.parse(data)));
     }
});

app.delete('/api/notes/:id', (req, res) => {
     const id = req.params.id;
     for (let i = 0; i < notes.length; i++) {
          if(notes[i].id === id) {
               notes.splice(i, 1);
          }
     }
     fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => err? console.log('success'):console.error(err))
     readFile('./db/db.json')
     .then((data) => res.json(JSON.parse(data)));
})



app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`));