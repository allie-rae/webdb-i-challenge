const express = require('express');
const AccountsRouter = require('./accounts-router');
const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());
server.use('/api/accounts', AccountsRouter);

server.get('/', (req, res) => {
    res.send('<h1>Testing testing 123</h1>')
})

module.exports = server;