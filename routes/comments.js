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
  console.log('req.session is ', req.session.userInfo.id);
  knex('posts')
  .join('comments', 'comments.id', 'comments.posts_id')
  .where('posts.id', req.session.userInfo.posts_id)
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
        posts_id: req.session.userInfo.posts_id,
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
                    res.redirect('/comments')
                })
        })

    })
module.exports = router;
