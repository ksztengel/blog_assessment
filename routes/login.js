const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const bcrypt = require('bcrypt');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

/* GET users listing. */


router.get('/auth/facebook',
    passport.authenticate('facebook', {
        scope: ['email']
    }));

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/posts',
        failureRedirect: '/login'
    }));

router.get('/', (req, res, next) => {
    res.render('login')
});

router.post('/', (req, res, next) => {
    knex('users')
        .where('email', req.body.email)
        .first()
        .then((user) => {
            var passwordMatch = bcrypt.compareSync(req.body.password, user.hashed_password)
            if (passwordMatch == false) {
                res.send('Bad email or password')
            } else {
                req.session.userInfo = user
                console.log(req.session.userInfo);
                res.redirect('posts')
            }
        })
        .catch((err) => {
            next(err);
        })
});

module.exports = router;
