angular.module("app").controller("SessionController", ["UserFactory", "SessionFactory", "RecordFactory", "$uibModal", "$stamplay",
function(UserFactory, SessionFactory, RecordFactory, $uibModal, $stamplay) {

  var vm = this;
  vm.new = "";
  vm.user;
  vm.sessions;
  vm.isUpdated = false;
  vm.records = [];
  vm.currentSession;
  init();

function init(){

  UserFactory.getCurrentUser().then(function (user){
    vm.user = user;

    SessionFactory.getNextSessionByUser(user.id)
        .then(function (sessions){
          vm.currentSession = sessions;
        });
  });
}

  vm.saveRecords = function (){
    //Simulation fin exercice 1
    var fakeRecord1 = {
      exercice : '5693e69368b96e2267646164',
      performance : 3
    }

    RecordFactory.addRecord(fakeRecord1);
    //Simulation fin exercice 2
    var fakeRecord2 ={
      exercice : '5693e5b268b96e2267646160',
      performance : 156
    };

    RecordFactory.addRecord(fakeRecord2)
      .then(function (){
        vm.records = RecordFactory.getRecords();
      });
  }

  vm.updateSession = function(session) {

    session.set("performances", RecordFactory.getRecords());

    SessionFactory.updateSession(session)
      .then(function(updatedSessions){
          vm.sessions = updatedSessions;
          vm.isUpdated = true;
      });
  }

  vm.deleteNote = function(note, idx) {
    vm.notes.splice(idx, 1);
    NoteFactory.deleteNote(note).then(function() {
      console.info("Note has been deleted.");
    })
  }

  vm.createNote = function() {
    var length = vm.notes.length;
    var body = vm.new;
    if(body.length < 1) return;
    var owner = $rootScope.user ? $rootScope.user.email : "anonymous"
    var item = { instance : { body : vm.new, owner : { email : owner } } };
    vm.new = "";
    vm.notes.push(item);
    NoteFactory.createNote(body, length)
      .then(function(res) {
        vm.notes[res.idx] = res.note;
      }, function() {
        console.error("Error: failed to create note.")
      })
  }

  vm.createExercise = function() {
    var length = vm.notes.length;
    var body = vm.new;
    if(body.length < 1) return;
    var owner = $rootScope.user ? $rootScope.user.email : "anonymous"
    var item = { instance : { body : vm.new, owner : { email : owner } } };
    vm.new = "";
    vm.exercises.push(item);
    ExerciseFactory.createExercise(body, length)
      .then(function(res) {
        vm.exercises[res.idx] = res.exercise;
      }, function() {
        console.error("Error: failed to create exercise.")
      })
  }

}])
