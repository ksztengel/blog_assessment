exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts', (table) => {
    table.increments();
    table.string('title').notNullable().defaultTo('');
    table.string('post').notNullable().defaultTo('');

    table.timestamps(true, true);
})
}
exports.down = function(knex) {
    return knex.schema.dropTable('posts')
}
