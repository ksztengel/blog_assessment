const express = require('express');
const router = express.Router();
const db = require('../db/api')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('posts', { title: 'Express' });
});

module.exports = router;
