// Karma configuration
// Generated on Sun Jun 28 2015 10:42:09 GMT+0200 (FLE Standard Time)

module.exports = function(config) {

  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '.',

    plugins: [
      'karma-jasmine',
      'karma-phantomjs-launcher',
      'karma-angular-filesort',
      'karma-coffee-preprocessor'
    ],

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'angular-filesort'],

    // list of files / patterns to load in the browser
    files: [
      'app/lib/angular/angular.js',
      'app/lib/angular-animate/angular-animate.js',
      'app/lib/angular-aria/angular-aria.js',
      'app/lib/**/angular-*.js',
      'app/lib/**/*.js',
      'app/app.js',
      'app/**/*-module.js',
      'app/**/*.js',
      'vendor/**/angular-mocks.js',
      'app/**/*-spec.*'
    ],

    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      './app/**/*.coffee': ['coffee']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
};
