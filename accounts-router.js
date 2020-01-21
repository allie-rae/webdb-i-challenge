const express = require('express');
const knex = require('./data/dbConfig');
const router = express.Router();

router.get('/', (req, res) => {
    knex
        .select('*')
        .from('accounts')
        .then(accounts => {
            res.status(200).json(accounts);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: "Error retrieving accounts from database." })
        })
})

router.get('/:id', (req, res) => {
    knex
        .select('*')
        .from('accounts')
        .where({ id: req.params.id })
        .first()
        .then(account => {
            res.status(200).json(account);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: 'Error retrieving account from database.' })
        })
})

module.exports = router;