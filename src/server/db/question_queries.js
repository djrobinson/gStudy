var knex = require('./knex');

function Questions() {
  return knex('questions');
}

module.exports = {
  getQuestions: function(){
    return Questions().select();
  },
  getQuestion: function(id){
    return Questions().where('id', id);
  },
  createQuestion: function(question){
    return Questions().insert(question, 'id');
  }
};