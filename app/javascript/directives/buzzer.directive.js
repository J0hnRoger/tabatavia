'use strict';

angular
  .module('app')
  .directive('buzzer', buzzer);

function buzzer() {
  var directive = {
    restrict: 'EA',
    templateUrl: './views/buzzer.html',
    controller: BuzzerCtrl,
    controllerAs: 'vm',
    bindToController: {

    }
  };

  return directive;

  function BuzzerCtrl(){

  }
}
