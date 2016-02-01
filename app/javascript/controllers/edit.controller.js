angular.module("app").controller("EditController", ["NoteFactory", "ExerciseFactory", "$uibModalInstance", "note", function(NoteFactory, $uibModalInstance, note) {

  var vm = this;
  vm.note = note.note.instance.body;

  vm.submit = function() {
    note.note.instance.body = vm.note;
    $uibModalInstance.close(note);
  }

}]);
