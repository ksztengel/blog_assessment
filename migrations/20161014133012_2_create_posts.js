exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts', (table) => {
    table.increments();
    table.integer('users_id')
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .index();
    table.string('title').notNullable().defaultTo('');
    table.string('post',4000).notNullable();

    table.timestamps(true, true);
})
}
exports.down = function(knex) {
    return knex.schema.dropTable('posts')
}
