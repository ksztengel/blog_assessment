const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

const authorize = (req, res, next) => {
        if (!req.session.userInfo) {
            res.render('error', {
                message: "You need to be signed in to access the posts page.",
            });
        }
        next();
    }
/* GET home page. */


router.get('/', authorize, (req, res, next) => {
    console.log('req.session is ', req.session.userInfo);
    knex('posts')
        .then((index) => {
            console.log('index', index);
            res.render('blog', {
                index: index,
                title: index.title,
                post: index.post,
                comment: index.comment,
                postsId: index.id

            })

        })
})

module.exports = router;
