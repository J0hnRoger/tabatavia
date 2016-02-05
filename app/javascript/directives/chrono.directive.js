'use strict';

angular
  .module('app')
  .directive('chrono', chrono);

function chrono() {
  var directive = {
    restrict: 'EA',
    templateUrl: './views/chrono.html',
    controller: ChronoCtrl,
    controllerAs: 'vm',
    bindToController: {

    }
  };

  return directive;

  function ChronoCtrl(){

  }
}
