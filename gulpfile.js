'use strict';

var gulp = require('gulp')
  , concat = require('gulp-concat')
  , uglify = require('gulp-uglify')
  , rimraf = require('rimraf');

var paths = {
  scripts: 'src/**/*.js'
};

gulp.task('clean', function(cb){
  rimraf('build/', cb);
});

gulp.task('scripts', ['clean'], function() {
  return gulp.src(paths.scripts)
    .pipe(uglify())
    .pipe(concat('all.min.js'))
    .pipe(gulp.dest('build/'));
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
});

gulp.task('default', ['watch', 'scripts']);
