var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');

gulp.task('js', function () {
  gulp.src(['pmaster/static/angular_client/app/**/*.module.js', 'pmaster/static/angular_client/app/**/*.js', '!pmaster/static/angular_client/app/app.min.js'])
    //.pipe(sourcemaps.init())
      .pipe(concat('pmaster/static/angular_client/app/app.min.js'))
      .pipe(ngAnnotate())
      //.pipe(uglify())
    //.pipe(sourcemaps.write())
    .pipe(gulp.dest('.'));
});

gulp.task('watch', ['js'], function () {
  gulp.watch('pmaster/static/angular_client/app/**/*.js', ['js']);
});
