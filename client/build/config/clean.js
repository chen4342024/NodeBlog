"use strict";
var gulp = require('gulp'),
    del = require('del'),
    setting = require('./setting');
var clean = require('gulp-clean');


gulp.task('clean', function () {
    return gulp.src(setting.dest + '*', {read: false})
        .pipe(clean({force: true}));
});
