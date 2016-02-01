angular
  .module('app')
  .factory('UserFactory', ["$stamplay", "$q", "$rootScope", UserFactory]);

function UserFactory($stamplay, $q, $rootScope) {

  var user = new $stamplay.User().Model;

  var service = {
    getCurrentUser : getCurrentUser,
    login : login,
    signup : signup,
    logout : logout
  };

  return service;

  // Methods

  function login (credentials) {
    var defer = $q.defer();
    user.login(credentials.email, credentials.password)
    .then(function() {
      defer.resolve(user.instance);
    });
    return defer.promise;
  }

  function signup (credentials) {
    var defer = $q.defer();
    user.signup({ email: credentials.email, password : credentials.password})
    .then(function() {
      defer.resolve(user.instance);
    })
    return defer.promise;
  }

  function logout () {
    var defer = $q.defer();
    user.logout();
    return defer.promise;
  }

  function getCurrentUser(){
    var defer = $q.defer();
    user.currentUser().then(function (){
      defer.resolve(user.instance);
    })
    return defer.promise;
  }
}
