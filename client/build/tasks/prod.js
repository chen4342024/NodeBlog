"use strict";
var gulp = require("gulp"),
  runSequence = require('run-sequence').use(gulp);


gulp.task("prod", ['clean'], function (cb) {
  runSequence(
    ['copy', 'compact:css','compact:js'],
    ['compact:processHtml'],
    cb);
});
