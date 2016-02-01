angular.module("app", [
  "ui.router",
  "ui.bootstrap",
  "ngStamplay"
])
.config(["$urlRouterProvider", "$stateProvider",
  function($urlRouterProvider, $stateProvider) {

    $stateProvider
      .state("Home", {
        url : "/",
        templateUrl : "./views/home.html",
        controller : "SessionController",
        controllerAs : "vm"
      })

    $urlRouterProvider.otherwise("/");

}])
.run(["$rootScope", function($rootScope) {

  Stamplay.init("tabatavia");

  var user = new Stamplay.User().Model;

  user.currentUser()
    .then(function() {
      if(user.isLogged()) {
        $rootScope.user = user.instance;
        $rootScope.$apply();
      } else {
        $rootScope.user = false;
        $rootScope.$apply();
      }

    })

}])
