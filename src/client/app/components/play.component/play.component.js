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

  playController.$inject = ['$location', '$localStorage','deckService', 'scoresService'];

  function playController($location, $localStorage, deckService, scoresService){
    var ctrl = this;
    ctrl.questions = [];
    var current = 0;
    $localStorage.questions = [];
    this.$routerOnActivate = function(next, previous) {
        var id = next.params.id;
        deckService.getQuestions(id).then(function(questions){
          console.log(questions);
          var deckQuestions = questions;
          ctrl.questions = shuffle(deckQuestions);
          ctrl.nextQuestion();
        });
        var score = {
          user_id: $localStorage.user_id,
          deck_id: id,
          num_right: 0,
          num_wrong: 0,
          updated: new Date()
        };
        scoresService.createScore(score).then(function(score){
          console.log(score);
          ctrl.score = score;
        });
      };

    ctrl.nextQuestion = function(score, result){
      ctrl.show = false;
      ctrl.question = ctrl.questions[current];
      if (score){
        $localStorage.questions.push(ctrl.question);
        if (result === true){
          score.num_right = score.num_right + 1;
          console.log("Current score ", score);
          scoresService.updateScore(score).then(function(data){
            score = data;
          });
        } else {
          score.num_wrong = score.num_wrong + 1;
          scoresService.updateScore(score).then(function(data){
            score = data;
          });
        }
      }
      if (current === ctrl.questions.length){
        $location.path('/');
      } else {
        current++;
      }
    };
    ctrl.showAnswer = function(){
      ctrl.show = true;
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