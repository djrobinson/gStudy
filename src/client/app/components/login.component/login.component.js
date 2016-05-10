(function(){
  'use strict';

  angular
    .module('gStudyApp')
    .component('loginComponent', {
      bindings: {
        ngModel: '='
      },
      controller: loginController,
      templateUrl: 'app/components/login.component/login.html'
    });

loginController.$inject = ['$rootScope', '$location', '$localStorage', 'Auth'];
function loginController($rootScope, $location, $localStorage, Auth){
    var ctrl = this;
    function successAuth(res) {
         console.log(res);
           console.log(res.token);
        if (res.token){
          $localStorage.token = res.token;
          $localStorage.email = res.email;
          $localStorage.name = res.name;
          $localStorage.user_id = res.user_id;
          console.log("Successfully logged in!");
          alert('pause');
          window.location = "/";
        } else {
          console.log("login Failed");
        }
      }

     ctrl.login = function () {
         var formData = {
             email: ctrl.email,
             password: ctrl.password
         };

         Auth.login(formData, successAuth, function () {
             $rootScope.error = 'Invalid credentials.';
         });
     };
  }
})();
