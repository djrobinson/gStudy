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

    ctrl.createDeck = function(){
      var deck = ctrl.deck;
      deck.updated = new Date();
      console.log(deck);
      deckService.createDeck(deck)
      .then(function(data){
        console.log(data);
      });
    };
  }
})();