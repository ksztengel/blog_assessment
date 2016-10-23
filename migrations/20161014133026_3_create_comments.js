exports.up = function(knex, Promise) {
    return knex.schema.createTable('comments', (table) => {
        table.increments();
        table.integer('posts_id')
            .notNullable()
            .references('id')
            .inTable('posts')
            .onDelete('CASCADE')
            .index();
        table.string('comment').notNullable().defaultTo('');
        table.timestamps(true, true);
    })
}
exports.down = function(knex) {
    return knex.schema.dropTable('comments')
}
