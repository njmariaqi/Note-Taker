const express = require('express');
const path = require('path');
const PORT = process.env.port || 3001;
const app = express();
const notes = require('./db/db.json');

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
     
});



app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`));