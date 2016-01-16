var gulp = require('gulp');
var inject = require('gulp-inject');
var gutil = require('gulp-util');

var root = "./src/www/";
var setting = {
    js: [
        root + 'js/app.js',
        root + 'app/route.js',
        root + 'js/**/*.js',
        root + 'app/**/*.js',
        root + 'common/**/*.js'
    ],
    css: [
        root + 'app/**/*.css',
        root + 'common/**/*.css',
        root + 'styles/**/*.css'
    ]
};


function filterPath(filePath) {
    return filePath.replace("/src/www/", "");
}

//注入js 以及样式。
gulp.task('inject', function () {
    var target = gulp.src(root + 'index.html');
    var cssSource = gulp.src(setting.css, {read: false});
    var jsSource = gulp.src(setting.js, {read: false});
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
        .pipe(gulp.dest(root));
});