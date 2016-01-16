"use strict";
var gulp = require("gulp"),
    runSequence = require('run-sequence').use(gulp);


gulp.task("dev", ['clean'], function (cb) {
    runSequence(
        ['inject'],
        ['copy'],
        cb
    );
});
