var gulp = require('gulp'),
    nodemon = require('gulp-nodemon');


gulp.task('nodemon', function () {
    nodemon({
        script  : 'server.js'
        , ext   : 'html js'
        , ignore: ['ignored.js']
        , tasks : ['lint']
    }).on('restart', function () {
        console.log('restarted!')
    }).on('start', function () {
        console.log('start');
    }).on('error', function (err) {
        throw err;
    });
});