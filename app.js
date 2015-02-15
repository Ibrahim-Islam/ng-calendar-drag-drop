var myAppModule = angular.module('MyApp', ['ui.calendar', 'ui.bootstrap', 'ngDragDrop'])

myAppModule.controller('MyController', function($scope, $q) {

  $scope.onStart = function(event, ui, title) {
    //Set whatever needed from drag item here
    $scope.draggedTitle = ui.helper[0].innerText;
  };

  $scope.beforeDrop = function(){
    //Return because we do not want droppable to actually drop
    var deferred = $q.defer();
    deferred.reject();
    return deferred.promise;
  };

  $scope.events = [];
  
  $scope.uiConfig = {
    calendar:{
      editable: true,
      droppable: true,
      drop: function (date, allDay){
        $scope.events.push({title: $scope.draggedTitle, start: date});
      },
      header:{
        left: 'month basicWeek basicDay agendaWeek agendaDay',
        center: 'title',
        right: 'today prev,next'
      },
      dayClick: $scope.alertEventOnClick,
      eventDrop: $scope.alertOnDrop,
      eventResize: $scope.alertOnResize
    }
  };

  $scope.eventSources = [$scope.events];

});