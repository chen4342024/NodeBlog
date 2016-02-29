var gulp = require('gulp');
var inject = require('gulp-inject');
var gutil = require('gulp-util');
var setting = require('./setting');

function filterPath(filePath) {
    return filePath.replace("/src/", "");
}

//注入js 以及样式。
gulp.task('inject', function () {
    var target = gulp.src(setting.root + 'index.html');
    var cssSource = gulp.src(setting.css, {read: false});
    var jsSource = gulp.src(setting.allJs, {read: false});
    var cssInjectOption = {
        transform: function (filePath) {
            return '<link rel="stylesheet" type="text/css" href="' + filterPath(filePath) + '" />';
        }
    };
    var jsInjectOption = {
        transform: function (filePath) {
            return '<script type="text/javascript" src="' + filterPath(filePath) + '"></script>';
        }
    };
    return target
        .pipe(inject(cssSource, cssInjectOption))
        .pipe(inject(jsSource, jsInjectOption))
        .pipe(gulp.dest(setting.root));
});