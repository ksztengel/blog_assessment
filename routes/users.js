const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const db = require('../db/api')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
