angular.module("app").controller("ModalController", ["UserFactory", "$uibModalInstance", function(UserFactory, $uibModalInstance) {

  var vm = this;

  vm.signup = function() {
    UserFactory.signup(vm.user);
    $uibModalInstance.close();
  }

  vm.login = function() {
    UserFactory.login(vm.user);
    $uibModalInstance.close();
  };

}]);
