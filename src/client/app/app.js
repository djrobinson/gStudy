(function(){
'use strict';
angular
  .module('gStudyApp', ['ngComponentRouter', 'ngStorage', 'btford.socket-io'])

  .config(function($locationProvider, $httpProvider) {
    $locationProvider.html5Mode(true);

  $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function ($q, $location, $localStorage) {
    return {
       'request': function (config) {
           config.headers = config.headers || {};
           if ($localStorage.token) {
               config.headers['x-access-token'] = $localStorage.token;
           }
           return config;
       },
       'responseError': function (response) {
           if (response.status === 401 || response.status === 403) {
               $location.path('/login');
           }
           return $q.reject(response);
       }
   };
  }]);
})

.value('$routerRootComponent', 'home')

.component('home', {
  templateUrl: 'app/template.html',
  $routeConfig: [
    {path: '/login', name: 'Login', component: 'loginComponent', useAsDefault: true},
    {path: '/register', name: 'Register', component: 'registerComponent' },
    {path: '/home', name: 'Main', component: 'mainComponent'},
    {path: '/create', name: 'Create', component: 'createComponent'},
    {path: '/show/:id', name: 'Show', component: 'showComponent'},
    {path: '/play/:id', name: 'Play', component: 'playComponent'}
  ],
  controller: logoutController
});



logoutController.$inject = ['$location', 'Auth'];
function logoutController($location, Auth){
  var ctrl = this;
  ctrl.logout = function () {
         Auth.logout(function () {
             $location.path('/login');
         });
     };
}
})();
