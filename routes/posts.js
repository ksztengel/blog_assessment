const express = require('express');
const router = express.Router();
const db = require('../db/api')

/* GET home page. */

router.get('/', (req, res, next) => {
    res.render('posts', {
        // profilePic: 'https://unsplash.it/200/?random'
    });
});
router.post('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
