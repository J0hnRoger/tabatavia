'use strict';

angular
  .module('app')
  .controller('WorkoutController', WorkoutController);

function WorkoutController() {
  var vm = this;
  vm.title = "Workout";

  activate();

  function activate() {

  }
}
