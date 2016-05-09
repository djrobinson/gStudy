(function(){
  'use strict';

  angular
    .module('gStudyApp')
    .component('createComponent', {
      bindings: {
        ngModel: '=',
      },
      controller: createController,
      templateUrl: 'app/components/create.component/create.html'
    });

  createController.$inject = ['deckService'];
  function createController(deckService){
    var ctrl = this;

    ctrl.questions = [0];

    ctrl.addQuestion = function(){
      var ques = ctrl.questions;
      var next = ques[ques.length] + 1;
      ctrl.questions.push(next);
    };

    ctrl.createDeck = function(){
      var deck = ctrl.deck;
      var questions = ctrl.questions;
      deck.updated = new Date();
      console.log(deck);
      deckService.createDeck(deck)
      .then(function(data){
        console.log("Questions: ", questions);
        questions.forEach(function(question){
          question.deck_id = data[0];
          console.log(question);
          deckService.createQuestion(question)
          .then(function(qData){
            console.log(qData);
          });
        });
      });
    };
  }
})();