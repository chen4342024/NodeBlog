var gulp = require('gulp');
var inject = require('gulp-inject');
var gutil = require('gulp-util');

var root = "./src/";
var lib = root + "lib/";
var setting = {
    js : [
        lib + "angular/angular.js",
        lib + "angular-ui-router/release/angular-ui-router.js",
        lib + "jquery/dist/jquery.js",
        lib + "bootstrap/dist/js/bootstrap.js",
        lib + "underscore/underscore.js",
        root + 'app/app.js',
        root + 'app/route.js',
        root + 'app/**/*.js',
        root + 'admin/**/*.js',
        root + 'common/**/*.js'
    ],
    css: [
        lib + "bootstrap/dist/css/bootstrap.css",
        root + 'app/**/*.css',
        root + 'admin/**/*.css',
        root + 'common/**/*.css',
        root + 'styles/**/*.css'
    ]
};




function filterPath(filePath) {
    return filePath.replace("/src/", "");
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