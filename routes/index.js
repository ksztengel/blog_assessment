const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', (req, res, next) => {
    console.log('req.session is ', req.session.userInfo);
    knex('posts')
        .where('id', req.session.userInfo.id)
        .then(index => {
            res.render('index', {
                index: index,
                title: index.title,
                post: index.post
            })
            console.log('index', index);
        })
})

module.exports = router;
