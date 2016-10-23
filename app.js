'use strict'
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const knex = require('./db/knex');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const configAuth = require('./public/config/auth');

const app = express();

app.use(passport.initialize());
app.use(cookieSession({
    name: 'blogpositive',
    secret: process.env.SESSION_SECRET,
    secureProxy: app.get('env') === 'production'
}));

passport.use(new FacebookStrategy({
        clientID: configAuth.clientID,
        clientSecret: configAuth.clientSecret,
        callbackURL: configAuth.callbackURL,
        profileFields: ['email', 'name', 'displayName', 'profileUrl'],
        enableProof: true,
        passReqToCallback: true
    },

    function(req, accessToken, refreshToken, profile, cb1) {
        db.createOrLogin(profile, (err, user) => {
            req.session.userInfo = user;
            return cb1(null, user);
        });
    }
))

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

switch (app.get('env')) {
  case 'development':
    app.use(morgan('dev'));
    break;

  case 'production':
    app.use(morgan('short'));
    break;

  default:
}

const routes = require('./routes/index');
const blog = require('./routes/blog');
const users = require('./routes/users');
const posts = require('./routes/posts');
const comments = require('./routes/comments');
const login = require('./routes/login');
const logout = require('./routes/logout');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('dev'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));


app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/blog', blog);
app.use('/users', users);
app.use('/posts', posts);
app.use('/comments', comments);
app.use('/login', login);
app.use('/logout', logout);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  if (app.get('env') !== 'test') {
    // eslint-disable-next-line no-console
    console.log('Listening on port', port);
  }
});
module.exports = app;
