const notesData = require('../db/db.json');
const uniqid = require('uniqid');
const fs = require('fs');

module.exports = (app) => {
  app.get('/api/notes', (req, res) => res.json(notesData));

  app.post('/api/notes', (req, res) => {
    req.body['id'] = uniqid();
    notesData.push(req.body);
    res.json(true);
    fs.writeFileSync('./db/db.json', JSON.stringify(notesData))
  })

  app.delete('/api/notes/:id', (req, res) => {
    let findId = notesData.findIndex(x => x.id === req.params.id);
    notesData.splice(findId, 1); 
    fs.writeFileSync('./db/db.json', JSON.stringify(notesData));
    res.end();
  })
}