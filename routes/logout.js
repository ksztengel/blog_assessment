const express = require('express');
const router = express.Router();
const knex = require('../db/knex')


router.get('/', ((req, res, next) => {
    req.session = null;
    res.redirect('/');
}))


module.exports = router;
