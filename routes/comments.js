const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

const authorize = (req, res, next) => {
        if (!req.session.userInfo) {
            res.render('error', {
                message: "You need to be signed in to access this page.",
            });
        }
        next();
    }
    /* GET home page. */

router.get('/:id', authorize, (req, res, next) => {
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
        const newComment = {
            posts_id: req.params.id,
            comment: req.body.comment
        }

        knex('comments')
            .insert(newComment, 'id')
            .then((comments) => {
                res.redirect('/comments/' + req.params.id)

            })

        .catch((err) => {
            next(err)
        })
    })
})

//edit/delete post:

router.post('/edit:id', (req, res, next) => {
let updatePost = {
    title: req.body.title,
    post: req.body.post
}
knex(`posts`)
    .where(`id`, req.params.id)
    .update(updatePost, '*')
    .then(() => {
        res.json({repsonse: 'post updated'})
    })
    .catch((err) => {
        next(err);
    });
});


router.post('/delete:id', (req, res, next) => {
    knex('posts')
        .where('id', req.params.id)
        .delete()
        .then(() => {
            res.json({response: 'post deleted'});
        })
        .catch((err) => {
            next(err);
        });

})

//edit/delete comments:
router.post('/edit:id', (req, res, next) => {
    let updateComment = {
        comment: req.body.comment
    }
    knex(`comments`)
        .update(updateComment, '*')
        .then((comment) => {
            knex('comments')
                .where(`id`, comment[0].id)
                .first()
                .then((newComment) => {
                    res.redirect({response: 'comment updated'})
                })
        })
        .catch((err) => {
            next(err);
        });
});


router.post('/delete:id', (req, res, next) => {
        knex('comments')
            .where('id', req.params.id)
            knex('comments')
            .delete()
            .where('id', req.params.id)
            .then(() => {
                res.json({response: 'comment deleted'})
            })
            .catch((err) => {
                next(err)
            })

    })



    module.exports = router;
