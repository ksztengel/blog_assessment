'use strict'

const knex = require('./knex')

module.exports = {
    getAllUsers: function(){
      return knex('users')
    },

    getOneUser: function(id){
      return knex('users')
      .where('users.id', id)
      .first()
    },

    createOneUser: function(user){
      return knex('users')
      .insert(user)
    }
}
