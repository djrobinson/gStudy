var knex = require('./knex');

function Wrongs() {
  return knex('wrongs');
}

module.exports = {
  getWrongs: function(user_id, deck_id){
    return Wrongs().select().where();
  },
  createWrong: function(question){
    return Wrongs().insert(question, 'id');
  }
};