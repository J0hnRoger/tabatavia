angular.module("app").controller("UserController", ["$uibModal", "UserFactory", function($uibModal, UserFactory) {

  var vm = this;

  vm.open_login = function() {
    var modal = $uibModal.open({
      templateUrl : "./views/login.html",
      controller : "ModalController",
      controllerAs : "nav"
    })
  }

  vm.open_register = function() {
    var modal = $uibModal.open({
      templateUrl : "./views/register.html",
      controller : "ModalController",
      controllerAs : "nav"
    });
  }

  vm.logout = function() {
    UserFactory.logout();
  };

}])
