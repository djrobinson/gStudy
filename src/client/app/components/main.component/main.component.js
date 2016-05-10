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
    //socketService was removed
  mainController.$inject = ['$scope','deckService','NotificationService', 'SocketService'];
  function mainController($scope, deckService, NotificationService, SocketService){
    var ctrl = this;
    deckService.getDecks()
    .then(function(data){
      ctrl.decks = data;
    });

    SocketService.forward('status', $scope);
    $scope.$on('socket:status', function (ev, data) {
      console.log(ev, data);
    });

    NotificationService.get().then(function (notifications) {
      console.log(notifications.data);
      ctrl.notifications = notifications.data;
      ctrl.unreadCount = ctrl.notifications.filter(function (notif) {
        return !notif.read;
      }).length;
    });

    ctrl.markAsRead = markAsRead;

    SocketService.forward('notification.read', $scope);
    $scope.$on('socket:notification.read', function (ev, msg) {
      ctrl.unreadCount -= 1;
    });

    SocketService.forward('notification.create', $scope);
    $scope.$on('socket:notification.create', function (ev, notification) {
      ctrl.notifications.push(notification);
      ctrl.unreadCount += 1;
    });

    function markAsRead (notif) {
      console.log(notif);
      if ( notif.read ) { ctrl.selected = notif; }
      else {
        NotificationService.read(notif.id)
        .then(function (notification) {
          console.log(notification);
          var selected = ctrl.notifications.filter(function (notif) {
            return notif.id === notification.data[0].id;
          })[0];
          selected.read = true;
          ctrl.selected = selected;
        });
      }
    }
  }
})();