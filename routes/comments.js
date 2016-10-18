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

router.get('/:id', (req, res, next) => {
    console.log('req.session', req.session);
    var post;
    var comments = [];
    var postId = req.params.id
    knex('posts')
        .where('id', req.params.id)
        .then(returnPost => {
            post = returnPost
            knex('comments')
                .where('posts_id', req.params.id)
                .then(returnComments => {
                    returnComments.forEach((comment) => {
                        if (comment.posts_id == req.params.id) {
                            comments.push(comment)
                        }
                    })
                    console.log("postId", postId);
                    res.render('comments', {
                        title: post[0].title,
                        post: post[0].post,
                        postId: postId,
                        comments: comments
                    })
                })

            .catch((err) => {
                next(err)
            })
        })

    router.post('/:id', (req, res, next) => {
        console.log("is this working", req.params.id);
        const newComment = {
            posts_id: req.params.id,
            comment: req.body.comment
        }

        knex('comments')
            .insert(newComment, 'id')
            .then((comments) => {
                        res.redirect('/comments/'+ req.params.id)

            })

        .catch((err) => {
            next(err)
        })
    })
})

router.get('/delete/:id', (req, res, next)=>{

  
})
module.exports = router;
