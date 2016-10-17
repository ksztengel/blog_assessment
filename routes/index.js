const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

/* GET home page. */


router.get('/', (req, res, next) => {
    console.log('req.session is ', req.session.userInfo);
    knex('posts')
        // .join('comments', 'posts.id', 'comments.posts_id')
        // .where('posts.id', req.session.userInfo.id)
        .then((index) => {
          console.log('index', index);
            res.render('index', {
                index: index,
                title: index.title,
                post: index.post,
                comment: index.comment
            })

        })
})

module.exports = router;
