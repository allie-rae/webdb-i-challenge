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

router.post('/', validateAccount, (req, res) => {
    const postData = req.body;
    knex('accounts')
    .insert(postData, 'id')
    .then(ids => {
        const id = ids[0];
        return knex('accounts')
        .select('id', 'name', 'budget')
        .where({ id })
        .first()
        .then(account => {
            res.status(201).json(account)
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: 'Error adding the account to the database.'})
    })
})

function validateAccount(req, res, next) {
    let body = req.body;
    let name = req.body.name;
    let budget = req.body.budget;
    if (!body) {
      res.status(400).json({ errorMessage: "Missing account data." })
    } else if (!name) {
      res.status(400).json({ errorMessage: "Missing required name field." })
    } else if (!budget) {
        res.status(400).json({ errorMessage: "Missing required budget field." })
    } else {
      next();
    };
  }

module.exports = router;