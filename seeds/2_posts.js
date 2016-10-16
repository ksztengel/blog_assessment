
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('posts')
        .insert({
          users_id: 1,
          title: 'This is my first post',
          post: 'I have so much to write about and so little time.'
        }),
        knex('posts')
        .insert({
          users_id:  3,
          title: 'I"m user number 2 and this is my first post',
          post: 'I have so little to say and so much time.'
        }),
        knex('posts')
        .insert({
          users_id: 2,
          title: 'I"m user number 2 and this is my first post',
          post: 'I think users 1 and 3 complain a lot.'
        })
      ]);
    });
};
