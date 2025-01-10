const routes = require('express').Router();
const jokes = require('../controllers/');

//routes.get('/', jokes.displayJoke);

routes.get('/', (req, res) => { res.send('Hello World');});

module.exports = routes;