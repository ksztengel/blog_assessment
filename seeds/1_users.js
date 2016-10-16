
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({
          first_name: 'Winston',
          last_name: 'Dog',
          email:'winston@email.com',
          user_name:'WHD',
          image:'http://www.fillmurray.com/g/200/300',
          hashed_password:'alkjdfpaoeinveea390482'
        }),
        knex('users').insert({
          first_name: 'Chuy',
          last_name: 'Horse',
          email:'chuy@email.com',
          user_name:'Bigchu',
          image:'http://www.fillmurray.com/g/200/299',
          hashed_password:'alkjdfpaoeinveea390482'
        }),
        knex('users').insert({
          first_name: 'Coqueta',
          last_name: 'Horse',
          email:'coqeuta@email.com',
          user_name:'Coqueta',
          image:'http://www.fillmurray.com/g/200/303',
          hashed_password:'alkjdfpaoeinveea390482'
        })
      ]);
    });
};
