'use strict'

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

router.get('/', authorize, (req, res, next) => {
    res.render('posts', {

    });
});

router.post('/', (req, res, next) => {
    console.log('hit the post route', req.body);
    const newPost = {
        title: req.body.title,
        post: req.body.post,
        users_id: req.session.userInfo.id
    }
    console.log(newPost);
    knex('posts')
        .insert(newPost, 'id')
        .then((posts) => {
            const id = posts[0]
            knex('posts')
                .where('id', id)
                .first()
                .then((returnPostObject) => {
                    returnPostObject = req.session.postObject
                    res.redirect('/blog')
                    console.log('returnPostObject', returnPostObject);
                })
        })
})




module.exports = router;
