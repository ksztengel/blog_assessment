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

    // post.comments = [];
    // var postId = req.params.id;

    // var commentId = comments.id;

    knex('posts')
        .where('id', req.params.id)
        .first()
        .then(returnPost => {
            console.log('returnpost', returnPost);
            var post = returnPost
            post.comments = []
            knex('comments')
                .where('posts_id', post.id)
                .then(returnComments => {
                    console.log('returnComments', returnComments);
                    returnComments.forEach((comment) => {
                        post.comments.push(comment)
                    })
                    console.log("post to be rendered", post);

                    res.render('comments', {
                        post: post
                    });

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
        console.log("newCommnent", newComment);

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

router.post('/editpost/:id', (req, res, next) => {
    console.log('req.body', req.body);
    let updatePost = {
        title: req.body.title,
        post: req.body.post
    }
    knex(`posts`)
        .where(`id`, req.params.id)
        .update(updatePost, '*')
        .then(() => {
            res.redirect('/comments/' + req.params.id)

        })
        .catch((err) => {
            next(err);
        });
});


router.get('/deletepost/:id', (req, res, next) => {
    knex('posts')
        .where('id', req.params.id)
        .delete()
        .then(() => {
            console.log({
                response: 'post deleted'
            });
            res.redirect('/blog')

        })
        .catch((err) => {
            next(err);
        });

})

//edit/delete comments:
router.get('/edit/:id', (req, res) => {

})
router.post('/edit/:id', (req, res, next) => {
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
                    res.redirect('/comments/' + req.params.id)
                        // res.json({response: 'comment updated'})
                })
        })
        .catch((err) => {
            next(err);
        });
});


router.get('/delete/:id', (req, res, next) => {

    knex('comments')
        .where('id', req.params.id)
        .first()
        .delete()
        .then(() => {
            res.redirect('/blog')
                // res.json({response: 'comment deleted'})
        })
        .catch((err) => {
            next(err)
        })

})



module.exports = router;
