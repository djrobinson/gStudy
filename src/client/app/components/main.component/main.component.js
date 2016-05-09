(function(){
  'use strict';

  angular
    .module('gStudyApp')
    .component('mainComponent', {
      bindings: {
        ngModel: '=',
      },
      controller: mainController,
      templateUrl: 'app/components/main.component/main.html'
    });

  mainController.$inject = ['deckService'];
  function mainController(deckService){
    var ctrl = this;
    deckService.getDecks()
    .then(function(data){
      ctrl.decks = data;
    });
  }
})();