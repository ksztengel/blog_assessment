const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', (req, res, next) => {
    console.log('req.session is ', req.session.userInfo.id);
    knex('posts')
        .where('id', req.session.userInfo.id)
        .then(comments => {
            res.render('comments', {
                comments: comments,
                title: comments.title,
                post: comments.post
            })
            console.log('comments', comments);
        })
})

router.post('/', (req, res, next) => {

    const newComment = {
        posts_id: req.session.userInfo.id,
        comment: req.body.comment
    }
    knex('comments')
        .insert(newComment, 'id')
        .then((comments) => {
            const id = comments[0]
            knex('comments')
                .where('id', id)
                .first()
                .then((returnCommentObject) => {
                    req.session.userInfo = returnCommentObject;
                    res.redirect('/')
                })
        })
        console.log(newComment);
    })
module.exports = router;
