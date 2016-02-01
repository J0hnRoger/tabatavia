angular.module("app").factory("NoteFactory", ["$stamplay", "$q", function($stamplay, $q) {
  return {
    getNotes : function() {
      var q = $q.defer();
      var notes = new $stamplay.Cobject("note").Collection;
      notes.populateOwner().fetch()
        .then(function() {
          q.resolve(notes.instance);
        }, function() {
          q.reject();
        })
        return q.promise;
    },
    updateNote : function(note) {
      var q = $q.defer();
        note.set("body", note.instance.body);
        note.save()
          .then(function() {
            q.resolve(note);
          }, function() {
            q.reject();
          })
        return q.promise;
    },
    createNote : function(body, idx) {
      var q = $q.defer();
      var note = new $stamplay.Cobject("note").Model;
      var user = new $stamplay.User().Model;
      note.set("body", body)
      note.save()
        .then(function() {
          user.currentUser().then(function() {
            if(user.isLogged()) {
              note.instance.owner = user.instance;
              var res = { note : note, idx : idx };
              q.resolve(res);
            } else{
              var res = { note : note, idx : idx };
              q.resolve(res);
            }
          })
        }, function() {
          q.reject();
        })
        return q.promise;
    },
    deleteNote : function(note) {
      var q = $q.defer();
        note.destroy()
          .then(function() {
            q.resolve();
          }, function() {
            q.reject();
          })
        return q.promise;
    }
  }
}])
