'use strict';
var gulp = require('gulp'),
  server = require('karma').Server;

var setting = {
  unit:"/unit.js"
};
/**
 * Run test for debug
 */
gulp.task('karma:unit', function (done) {
  var karma = new server({
    singleRun: false,
    configFile: __dirname + setting.unit
  }, done);
  karma.start();
});


//暂无用
gulp.task('karma:unit_run', function (done) {
  var karma = new server({
    singleRun: true,
    configFile: __dirname + setting.unit
  }, done);
  karma.start();
});
