
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notifications', function(table){
    table.increments();
    table.integer('user_id');
    table.string('type');
    table.date('updated');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('notifications');
};
