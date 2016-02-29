"use strict";
var gulp = require('gulp');

var setting = require('./setting');

gulp.task('watch', function () {
    gulp.watch(setting.lib, ['copy:lib']);
    gulp.watch(setting.assets, ['copy:assets']);
    gulp.watch(setting.css, ['copy:css']);
    gulp.watch(setting.html, ['copy:html']);

    gulp.watch(setting.js.common, ['copy:js_common']);
    gulp.watch(setting.js.app, ['copy:js_app']);
    gulp.watch(setting.js.admin, ['copy:js_admin']);
    gulp.watch(setting.js.lib, ['copy:js_lib']);
});

