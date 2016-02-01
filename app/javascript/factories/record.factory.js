'use strict';

angular
  .module('app')
  .factory('RecordFactory', RecordFactory);

RecordFactory.$inject = ['$stamplay', '$q'];
function RecordFactory($stamplay, $q) {

  var sessionRecords = [];

  var service = {
    addRecord : addRecord,
    getRecords : getRecords
  };

  return service;

  function addRecord(recordJson){
    var defer = $q.defer();
    var record = new $stamplay.Cobject('record').Model;
    record.set('exercice', recordJson.exercice);
    record.set('performance', recordJson.performance);

    record.save()
      .then(function(){
          sessionRecords.push(record.instance.id);
          defer.resolve(record.instance);
      });
    return defer.promise;
  }

  function getRecords() {
    return sessionRecords;
  }
}
