const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
  //res.status(404).send('Hello World!');
});

var server = app.listen(port,'0.0.0.0', () => {
  console.log('App listening');
});

module.exports = server;