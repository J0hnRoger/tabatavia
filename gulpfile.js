var gulp = require("gulp");
var plumber = require("gulp-plumber");
var uglify = require('gulp-uglify');
var nano = require("gulp-cssnano")
var htmlmin = require("gulp-htmlmin");
var notifier = require("node-notifier");
var usemin = require("gulp-usemin");
var exec = require("gulp-exec");
var templateCache = require('gulp-angular-templatecache');

gulp.task('bundle:assets', function() {
  notifier.notify({ title: 'Development Build', message: 'Starting build..'});
  return gulp.src('./app/index.html')
  .pipe(plumber())
  .pipe(usemin())
  .pipe(plumber.stop())
  .pipe(gulp.dest('build'))
  .on("end", function() {
    notifier.notify({ title: 'Development Build', message: 'Development build complete!'});
  });
})

gulp.task("bundle:templates", function() {
  notifier.notify({ title: 'Development Build', message: 'Starting build..'});
  return gulp.src("./app/templates/*.html")
  .pipe(plumber())
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest('build/views'))
  .on("end", function() {
    notifier.notify({ title: 'Development Build', message: 'Development build complete!'});
  })
})

gulp.task('bundle:angular-tmpl', function () {
  notifier.notify({ title: 'Angular Template Generation', message: 'Starting ..' })
  return gulp.src('./app/javascript/directives/*.html')
    .pipe(templateCache("templates.js", { module : "app"}))
    .pipe(gulp.dest('./app/templates'))
    .on("end", function() {
      notifier.notify({ title: 'Angular Template Generation', message: 'Templates generated!' });
    });
});

gulp.task("build", function() {
  notifier.notify({ title: 'Production Build', message: 'Starting build..' })
  return gulp.src('./app/index.html')
  .pipe(plumber())
  .pipe(usemin({
    js : [ uglify ],
    jsAttributes : {
      async : true
    },
    css : [ nano ]
  }))
  .pipe(plumber.stop())
  .pipe(gulp.dest('build'))
  .on("end", function() {
    notifier.notify({ title: 'Production Build', message: 'Production build complete!' });
  })
})




gulp.task("dev", ["bundle:assets"], function() {
  gulp.watch(["./app/javascript/**/*", "./app/css/**/*", "./app/index.html"], ["bundle:assets"])
  gulp.watch("./app/templates/*", ["bundle:templates"])
})
