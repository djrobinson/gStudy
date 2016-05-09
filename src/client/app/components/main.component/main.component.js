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

  function mainController(){

  }
})();