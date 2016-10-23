const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const bcrypt = require('bcrypt');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
