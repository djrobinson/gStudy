(function(){
  'use strict';

  angular
    .module('gStudyApp')
    .component('playComponent', {
      bindings: {
        ngModel: '=',
      },
      controller: playController,
      templateUrl: 'app/components/play.component/play.html'
    });

  playController.$inject = ['$location', '$localStorage','$rootRouter','deckService', 'scoresService'];

  function playController($location, $localStorage, $rootRouter, deckService, scoresService){
    var ctrl = this;
    ctrl.questions = [];
    var current = 0;
    ctrl.previousQuestions = [];
    var id = 0;
    var user_id = $localStorage.user_id;
    this.$routerOnActivate = function(next, previous) {
        id = next.params.id;
        deckService.getQuestions(id).then(function(questions){
          console.log(questions);
          var deckQuestions = questions;
          ctrl.questions = shuffle(deckQuestions);
          ctrl.show = false;
          ctrl.done = false;
          ctrl.question = ctrl.questions[current];
        });
        var score = {
          user_id: user_id,
          deck_id: id,
          num_right: 0,
          num_wrong: 0,
          updated: new Date()
        };
        scoresService.createScore(score).then(function(score){
          ctrl.score = score;
        });
      };

    ctrl.nextQuestion = function(score, result){
      ctrl.show = false;
      ctrl.question = ctrl.questions[current];
      ctrl.previousQuestions.push(ctrl.question);
      if (result === true){
        score.num_right = score.num_right + 1;
        scoresService.updateScore(score).then(function(data){
          score = data;
        });
      } else {
        //ADD WRONG QUESTION TO THE WRONGS TABLE
        scoresService.addWrong(user_id, ctrl.question.id, id)
        .then(function(data){
          console.log("wrong added: ",data);
        });
        //UPDATE OVERALL SCORE
        score.num_wrong = score.num_wrong + 1;
        scoresService.updateScore(score)
        .then(function(data){
          score = data;
        });
      }
      if (current === ctrl.questions.length - 1){
        ctrl.done = true;
      } else {
        current++;
      }
    };
    ctrl.showAnswer = function(){
      ctrl.show = true;
    };
    ctrl.home = function(){
      $rootRouter.navigate(['Main']);
    };
    function shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    }
  }
})();