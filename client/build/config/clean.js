"use strict";
var gulp = require('gulp'),
  del = require('del');

var setting = {
  clean: ['www']
};


gulp.task('clean', function () {
  return del(setting.clean);
});
