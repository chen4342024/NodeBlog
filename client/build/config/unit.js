module.exports = function (config) {
    config.set({

        basePath: '../../..',

        browsers: ['Chrome'],

        frameworks: ['jasmine'],

        files: [
            'src/www/lib/ionic/js/ionic.bundle.js',
            'src/www/lib/ionic/js/angular/angular-mocks.js',
            'src/www/js/app.js',
            'src/www/!(test_out)/**/*.js',
            'src/www/test/**/*.spec.js'
        ],

        exclude: [
        ],

        //配置覆盖的路径
        preprocessors: {
            'src/www/test/**/*.js': 'coverage'
        },

        //配置输出方式
        reporters: ['progress', 'html', 'coverage'],

        //html格式输出
        htmlReporter: {
            outputDir: 'karma_html', // where to put the reports
            templatePath: null, // set if you moved jasmine_template.html
            focusOnFailures: true, // reports show failures on start
            namedFiles: false, // name files instead of creating sub-directories
            pageTitle: null, // page title for reports; browser info by default
            urlFriendlyName: false, // simply replaces spaces with _ for files/dirs
            preserveDescribeNesting: false, // folded suites stay folded
            foldAll: false, // reports start folded (only with preserveDescribeNesting)
        },

        port: 9877,

        //配置检查覆盖率的输出
        coverageReporter: {
            type: 'html',
            dir: 'src/www/test_out/coverage/'
        },

        autoWatch: true,

        //修复改变文件是会触发删除的bug
        usePolling: true
    });
};
