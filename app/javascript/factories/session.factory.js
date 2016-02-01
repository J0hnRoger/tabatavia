'use strict';

angular
  .module('app')
  .factory('SessionFactory', SessionFactory);

SessionFactory.$inject = ['$stamplay', '$q'];
function SessionFactory($stamplay, $q) {

  var sessionsCollection = new $stamplay.Cobject('session').Collection;

  var service = {
    getSessionByUser: getSessionByUser,
    getNextSessionByUser : getNextSessionByUser,
    updateSession : updateSession
  };

  return service;

  function getNextSessionByUser(userId) {
      var defer = $q.defer();

      var now = new Date("2016-01-30");

      var query = new Stamplay.Query('cobject','session');

      query.equalTo('worker', userId);
      query.lessThanOrEqual('sessionDate',now.toISOString());

      query.exec()
        .then(function(response){
          defer.resolve(response);
      });
      return defer.promise;
    }

  function getSessionByUser(user) {
    var defer = $q.defer();
    sessionsCollection.equalTo('worker', user.id)
      .populate()
      .fetch()
      .then(function(){
        defer.resolve(sessionsCollection.instance);
      })
    return defer.promise;
  }

  function updateSession(session) {
    var defer = $q.defer();
    if (session.instance.id == undefined)
      console.error('updateSession : the session object is not a Sessions cobject.');

    sanitizeCobject(session.instance);

    session.save()
      .then(function(){
          console.info("Record has been created.");
          defer.resolve();
       },
       function(err){
         console.error("OhOh, Record has not been created." + err);
       }
     )
     return defer.promise;
    }

    //Internal Functions
  function sanitizeCobject(object){
    Object.keys(object).forEach(function (key) {
      //si c'est un objet de type CObject
       if (isObjectArray(object[key]))
        object[key] = depopulate(object[key]);
    });
    return object;
  }

  function isObjectArray(val){
    return (val.constructor.name == "Array"
      && val.length > 0
      && val[0].constructor.name == "Object");
  }

  function depopulate(objArray){
    var flatArr = [];
    for(obj in objArray){
      flatArr.push(objArray[obj].id);
    }
    return flatArr;
  }

}
