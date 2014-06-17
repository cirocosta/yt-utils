'use strict';

var gulp = require('gulp')
  , uglify = require('gulp-uglify')
  , rename = require('gulp-rename')
  , browserify = require('browserify')
  , source = require('vinyl-source-stream')
  , rimraf = require('rimraf');

gulp.task('clean', function(cb){
  rimraf('build/', cb);
});

gulp.task('browserify', function () {
  return browserify('./src/yt.js')
    .bundle()
    .pipe(source('yt.js'))
    .pipe(gulp.dest('./build/'));
});

gulp.task('build', ['browserify'], function () {
  return gulp.src('./build/yt.js')
    .pipe(uglify({mangle: true}))
    .pipe(rename('yt.min.js'))
    .pipe(gulp.dest('build/'));
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['build']);
});

gulp.task('default', ['watch', 'build']);
