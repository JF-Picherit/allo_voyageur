var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var path = require('path');
var app = express();
var port = 4000;
var http = require('http');
var cors = require('cors');
require('colors');

const UsersRepository = require('./repositories/users.pg');
const AnnoncesRepository = require('./repositories/annonces.pg.js');

const usersController = require('./controllers/users.controller');
const annoncesController = require('./controllers/annonces.controller');

const userRoutes = require('./routes/users.route');
const annonceRoutes = require('./routes/annonces.route');

const usersRepository = new UsersRepository();
const annoncesRepository = new AnnoncesRepository();

var server = http.createServer(app).listen(port, () => {
  var desc = "Adresse du serveur: ";
  var adresse = ` http://localhost:${port}`.green.bold;
  console.log(`################################################################`.yellow.bold);
  console.log(desc + adresse);
  console.log(`################################################################`.yellow.bold);
});

var io = require('socket.io')({ allowEIO3: true }).listen(server);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use('/users', userRoutes(express, usersController(usersRepository)));
app.use('/annonces', annonceRoutes(express, annoncesController(annoncesRepository)));

io.on('connection', (socket) => {
  console.log(`=================================== Web Socket =======================================`.blue.bold);
  // console.log(socket);
  console.log(`a user is connected`.green.bold);
  socket.on('disconnect', () => {
    console.log(`a user is disconnected`.red.bold);
  });
  socket.on('message', ({ name, message }) => {
    io.emit('message', { name, message });
    console.log(`message recu : ${message}`.magenta.bold);
  });
});

 module.exports = app;