'use strict'

const knex = require('./knex')

module.exports = {
    getAllUsers: function(){
      return knex('posts')
    },

    getOneUser: function(id){
      return knex('posts')
      .where('posts.id', id)
      .first()
    },

    createOneUser: function(user){
      return knex('posts')
      .insert(post)
    }
}
