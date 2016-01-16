var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    processhtml = require('gulp-processhtml');


var root = "./src/www/";


var setting = {
    dist: "www/",
    style: [
        root + 'app/**/*.css',
        root + 'common/**/*.css',
        root + 'styles/**/*.css'
    ],
    styleOutput: "all.min.css",
    distCss: 'www/styles',
    js: [
        root + 'js/app.js',
        root + 'app/route.js',
        root + 'js/**/*.js',
        root + 'app/**/*.js',
        root + 'common/**/*.js'
    ],
    jsOutput: "all.min.js",
    distJs: 'www/js'
};

gulp.task('compact:css', function () {                                //- 创建一个名为 concat 的 task
    gulp.src(setting.style)    //- 需要处理的css文件，放到一个字符串数组里
        .pipe(concat(setting.styleOutput))                            //- 合并后的文件名
        .pipe(minifyCss())                                      //- 压缩处理成一行
        .pipe(gulp.dest(setting.distCss));                   //- 输出文件本地
});

gulp.task('compact:js', function () {                                //- 创建一个名为 concat 的 task
    gulp.src(setting.js)    //- 需要处理的js文件，放到一个字符串数组里
        .pipe(concat(setting.jsOutput))                            //- 合并后的文件名
        .pipe(uglify())                                      //- 压缩处理成一行
        .pipe(gulp.dest(setting.distJs));                   //- 输出文件本地
});


var opts = {/* plugin options */};
gulp.task("compact:processHtml", function () {
    return gulp.src(setting.dist + 'index.html')
        .pipe(processhtml(opts))
        .pipe(gulp.dest(setting.dist));
});
