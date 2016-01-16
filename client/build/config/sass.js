"use strict";
var gulp = require('gulp'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  connect = require('gulp-connect'),
  minifyCss = require('gulp-minify-css'),
  rev = require('gulp-rev'),
  gulpif = require('gulp-if'),
  args = require('yargs').argv,
  isProductVersion = args.env === 'prod';

var setting = {
  dest: {
    dist: 'www/'
  },
  sass : "src/www/app.scss",
  watch: ['src/www/**/*.scss']
};


gulp.task('sass', function () {
  gulp.src(setting.sass)
    .pipe(gulpif(!isProductVersion, sourcemaps.init()))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpif(!isProductVersion, sourcemaps.write()))
    .pipe(gulpif(isProductVersion, minifyCss()))
    .pipe(gulpif(isProductVersion, rev()))
    .pipe(gulp.dest(setting.dest.dist))
    .pipe(connect.reload());
});
