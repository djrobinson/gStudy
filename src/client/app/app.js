'use strict';


angular.module('gStudyApp', ['ngComponentRouter'])

.config(function($locationProvider) {
  $locationProvider.html5Mode(true);
})

.value('$routerRootComponent', 'home')

.component('home', {
  template: '<h1>Hello!</h1>',
  $routeConfig: [
    {path: '/login', name: 'Login', component: 'loginComponent', useAsDefault: true},
    // {path: '/register', name: 'Register', component: 'registerComponent' }
  ]
});
