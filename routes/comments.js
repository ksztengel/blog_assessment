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

router.get('/', (req, res, next) => {
  let postsId = Number.parseInt(req.session.postObject.id)
  console.log('postsId', postsId);
    knex('posts')
        .join('comments', 'posts.id', 'comments.posts_id')
        .where('posts.id', postsId)
        .then(comments => {
            res.render('comments', {
                comments: comments,
                title: comments.title,
                post: comments.post,
                comment: comments.comments
            })
            console.log('comments under post', comments);
        })
})
router.post('/', (req, res, next) => {

    const newComment = {
        posts_id: req.session.postObject.id,
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
                    req.session.commentObject = returnCommentObject;
                    res.redirect('/comments')
                })
        })

})
module.exports = router;
