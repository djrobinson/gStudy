'use strict';


angular.module('gStudyApp', ['ngComponentRouter', 'ngStorage'])

.config(function($locationProvider) {
  $locationProvider.html5Mode(true);
})

.value('$routerRootComponent', 'home')

.component('home', {
  templateUrl: 'app/template.html',
  $routeConfig: [
    {path: '/login', name: 'Login', component: 'loginComponent', useAsDefault: true},
    {path: '/register', name: 'Register', component: 'registerComponent' }
  ],
  controller: logoutController
});

logoutController.$inject = ['Auth'];
function logoutController(Auth){
  var ctrl = this;
  ctrl.logout = function () {
         Auth.logout(function () {
             window.location = "/"
         });
     };
}
