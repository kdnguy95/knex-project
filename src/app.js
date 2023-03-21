const express = require('express')
const app = express();
const port = 8081;

const knex = require('knex')(require('../knexfile.js')['development'])

app.get('/', (req, res) => {
  res.send('Application up and running')
})

app.listen(port, () => {
  console.log('knex and express applications are running successfully')
})

app.get('/pets', (req, res) => {
  knex('pet')
    .select('*')
    .then(pets => {
      var petNames = pets.map(pet => pet.name)
      res.json(petNames)
    })
})

app.get('/movies', function(req, res) {
  knex
    .select('*')
    .from('movies')
    .then(data => res.status(200).json(data))
    .catch(err =>
      res.status(404).json({
        message:
          'The data you are looking for could not be found. Please try again'
      })
    );
});