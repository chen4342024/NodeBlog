"use strict";
var gulp = require('gulp');
var setting = require('./setting');

var copySetting = {
    other:[
        setting.lib + "bootstrap/dist/**/*",
        setting.lib + "angular-ueditor/dist/angular-ueditor.js.map",
    ]
};

//复制（总task）
gulp.task('copy', ['copy:lib', 'copy:assets', 'copy:js', 'copy:css', 'copy:html','copy:other']);

//lib
gulp.task('copy:lib', function () {
    return gulp.src(setting.lib + 'ueditor/**/*', {base: setting.root})
        .pipe(gulp.dest(setting.dest));
});

//img
gulp.task('copy:assets', function () {
    gulp.src(setting.assets, {base: setting.root})
        .pipe(gulp.dest(setting.dest))
});

//styles
gulp.task('copy:css', function () {
    gulp.src(setting.css, {base: setting.root})
        .pipe(gulp.dest(setting.dest))
});

//root
gulp.task('copy:html', function () {
    gulp.src(setting.html, {base: setting.root})
        .pipe(gulp.dest(setting.dest))
});

gulp.task('copy:other', function () {
    gulp.src(copySetting.other, {base: setting.root})
        .pipe(gulp.dest(setting.dest))
});



//js
gulp.task('copy:js', ['copy:js_common', 'copy:js_app', 'copy:js_admin', 'copy:js_lib']);

gulp.task('copy:js_common', function () {
    gulp.src(setting.js.common, {base: setting.root})
        .pipe(gulp.dest(setting.dest))
});

gulp.task('copy:js_app', function () {
    gulp.src(setting.js.app, {base: setting.root})
        .pipe(gulp.dest(setting.dest))
});

gulp.task('copy:js_admin', function () {
    gulp.src(setting.js.admin, {base: setting.root})
        .pipe(gulp.dest(setting.dest))
});

gulp.task('copy:js_lib', function () {
    gulp.src(setting.js.lib, {base: setting.root})
        .pipe(gulp.dest(setting.dest))
});


