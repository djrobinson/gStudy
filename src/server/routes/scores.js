var express = require('express');
var router = express.Router();
var query = require('../db/score_queries.js');

router.get('/', function(req, res, next){
  query.getQuestions().then(function(data){
    res.json(data);
  });
});

router.post('/create', function(req, res, next){
  console.log(req.body);
  var question = req.body;
  query.createQuestion(question).then(function(data){
    res.json(data);
  });
});

module.exports = router;