(function(){
  'use strict';

  angular
    .module('gStudyApp')
    .component('loginComponent', {
      bindings: {
        ngModel: '=',
      },
      controller: loginController,
      templateUrl: './login.html'
    });

  function loginController(){

  }
})();

