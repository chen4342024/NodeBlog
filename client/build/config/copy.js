"use strict";
var gulp = require('gulp');

//配置
var setting = {
  base:'src/www',
  dest: {
    dist: 'www/'
  },

  path: {
    lib: ['src/www/lib/**/*','src/www/app/**/*','src/www/common/**/*'],
    img: 'src/www/img/**',
    styles:'src/www/styles/**',
    js: {
      other:['src/www/js/**/*.js'],
      front: ['src/www/app/**/*.js'],
      common: ['src/www/common/**/*.js']
    },
    root:['src/www/index.html','src/www/templates/**']
  }
};

//复制（总task）
gulp.task('copy', ['copy:lib', 'copy:img', 'copy:js','copy:styles','copy:root']);

//lib
gulp.task('copy:lib', function () {
  return gulp.src(setting.path.lib, {base: setting.base})
    .pipe(gulp.dest(setting.dest.dist));
});


//img
gulp.task('copy:img', function () {
  gulp.src(setting.path.img, {base: setting.base})
    .pipe(gulp.dest(setting.dest.dist))
});

//styles
gulp.task('copy:styles', function () {
  gulp.src(setting.path.styles, {base: setting.base})
    .pipe(gulp.dest(setting.dest.dist))
});

//root
gulp.task('copy:root', function () {
  gulp.src(setting.path.root, {base: setting.base})
    .pipe(gulp.dest(setting.dest.dist))
});

//js
gulp.task('copy:js', ['copy:js_common','copy:js_other','copy:js_front']);

gulp.task('copy:js_common', function () {
  gulp.src(setting.path.js.common, {base: setting.base})
    .pipe(gulp.dest(setting.dest.dist))
});

gulp.task('copy:js_other', function () {
  gulp.src(setting.path.js.other, {base: setting.base})
    .pipe(gulp.dest(setting.dest.dist))
});

gulp.task('copy:js_front', function () {
  gulp.src(setting.path.js.front, {base: setting.base})
    .pipe(gulp.dest(setting.dest.dist))
});


