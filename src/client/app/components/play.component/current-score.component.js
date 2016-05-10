(function(){
  'use strict';

  angular
    .module('gStudyApp')
    .component('currentScore', {
      bindings: {
        ngModel: '=',
      },
      controller: scoreController,
      templateUrl: 'app/components/score.component/score.html'
    });

  scoreController.$inject = ['deckService'];

  function playController(deckService){
    var ctrl = this;
    this.$routerOnActivate = function(next, previous) {
        var id = next.params.id;
        deckService.getDeck(id).then(function(deck) {
          ctrl.deck = deck[0];
        });
        deckService.getQuestions(id).then(function(questions){
          console.log(questions);
          ctrl.deckQuestions = questions;
        });
      };
    }
})();