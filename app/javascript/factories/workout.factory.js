'use strict';

angular
  .module('app')
  .factory('Workout', Workout);

SessionFactory.$inject = ['$stamplay', '$q'];
function Workout($stamplay, $q) {

  var workout = new $stamplay.Cobject('workout').Model;

  var service = {
    setWorkout : setWorkout
  };

  return service;

  function setWorkout(id){
    var defer = $q.defer();
    workout.fetch(id)
      .then(function (){
        defer.resolve(workout.instance);
      });
    return defer.promise;
  }
}
