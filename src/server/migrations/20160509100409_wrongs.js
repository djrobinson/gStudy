
exports.up = function(knex, Promise) {
  return knex.schema.createTable('wrongs', function(table){
    table.increments();
    table.integer('question_id');
    table.string('user_id');
    table.date('updated');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('wrongs');
};
