"use strict";
var gulp = require("gulp"),
  runSequence = require('run-sequence').use(gulp);

/**
 * gulp test_singleRun --env production
 */
gulp.task("unit", function () {
  runSequence(
    ['karma:unit']
  );
});
