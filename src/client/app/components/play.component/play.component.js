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

  playController.$inject = ['$location', '$localStorage','deckService'];

  function playController($location, $localStorage, deckService){
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
      };

    ctrl.nextQuestion = function(){
      ctrl.show = false;
      ctrl.question = ctrl.questions[current];
      $localStorage.questions.push(ctrl.question);
      console.log(ctrl.question);
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