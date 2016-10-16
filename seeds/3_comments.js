
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('comments')
        .insert({
          posts_id: 1,
          comment: 'Seriously?',
        }),
        knex('comments')
        .insert({
          posts_id:  3,
          comment: 'I should have invented Instagram',
        }),
        knex('comments')
        .insert({
          posts_id: 2,
          comment: 'That is not a good post',
        })
      ]);
    });
};
