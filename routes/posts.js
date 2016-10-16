const express = require('express');
const router = express.Router();
const knex = require('../db/knex');


/* GET home page. */
// function addSubmitListener() {
//     $('#postButton').on('click', function() {
//       if ($('input[name=title]').val().length ===0) {
//         Materialize.toast('Please enter a title.', 4000);
//       }
//       if ($('input[name=post]').val() === 0) {
//         Materialize.toast('Please enter a post.', 4000);
//       }
//     })
//   }

router.get('/', (req, res, next) => {
    res.render('posts', {

    });
});

router.post('/', (req, res, next) => {

    const newPost = {
        users_id: req.session.userInfo.id,
        title: req.body.title,
        post: req.body.post

    }

    knex('posts')
        .insert(newPost, 'id')
        .then((posts) => {
            const id = posts[0]
            knex('posts')
                .where('id', id)
                .first()
                .then((returnPostObject) => {
                    req.session.userInfo = returnPostObject;
                    res.redirect('/')
                })
        })
})

module.exports = router;

//
// router.get('/:id', (req, res, next) => {
//     knex('posts')
//         .where('posts.id', req.params.id)
//         .first()
//         .then((post) => {
//             if (!post) {
//                 return next();
//             }
//             res.send(post);
//         })
//         .catch((err) => {
//             next(err);
//         });
// });

// router.post('/', (req, res, next) => {
//     let insertPost = {
//         title: req.body.title,
//         post: req.body.post,
//
//     }
//     knex(`posts`).insert(insertPost, `id`).then((num) => {
//             const id = num[0];
//             knex('books')
//                 .where(`id`, id).first().then((insertPost) => {
//                     res.send(insertPost)
//                 })
//         })
//         .catch((err) => {
//             next(err);
//         });
// });
//
// router.patch('/:id',(req, res, next) => {
//     let updatePost = {
//         title: req.body.title,
//         post: req.body.post
//
//     }
//     knex(`posts`)
//         .update(updatePost, '*')
//         .then((post) => {
//             knex('posts')
//                 .where(`id`, book[0].id).first().then((newPost) => {
//                     res.send(newPost)
//                 })
//         })
//         .catch((err) => {
//             next(err);
//         });
// });
// router.delete('/:id', (req, res, next) => {
//     const id = Number.parseInt(req.params.id);
//     if (Number.isNaN(id)) {
//         return next();
//     }
//     let post;
//     knex('posts')
//         .where('id', id)
//         .first()
//         .then((row) => {
//             if (!row) {
//                 return next();
//             }
//             book = row;
//             return knex('posts')
//                 // .returning('*')
//                 .del()
//                 .where('id', id);
//         })
//         .then(() => {
//             delete post.id;
//             res.json(post);
//         })
//         .catch((err) => {
//             next(err);
//         });
// });

module.exports = router;
