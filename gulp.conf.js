module.exports = function() {

  var app = './client/';
  var appJs = [
    app + 'app.js', '!' + app + 'lib{,/**}',
    '!' + app + 'templatecache{,/**}', '!' + app + '**/*-spec.*',
    app + 'core/**/*-module.js', app + 'services/**/*.js', app + 'core/config/*.js',
    app + 'core/**/*.js', app + 'blocks/**/*-module.js', app + 'blocks/**/*.js',
    app + 'components/**/*-module.js', app + 'components/**/*.js',
    app + 'modules/**/*-module.js', app + 'modules/**/*.js',
    app + 'assets/**/*.js', app + '**/*.js'
  ];
  var dist = './public/';
  var distJs = dist + 'js/**/*.js';
  var distJson = dist + 'js/**/*.json';
  var rootJs = [
    './*.js', '!vendor{,/**}', '!node_modules{,/**}', '!karma.conf.js'
  ];
  var specJs = app + '**/*-spec.coffee';
  var libJs = [
    app + 'lib/**/*jquery*.js', app + 'lib/**/angular.min.js', app + 'lib/**/*route*.js',
    app + 'lib/**/*resource*.js', app + 'lib/**/*cookie*.js', app + 'lib/**/*token*.js',
    app + 'lib/**/*animate*.js', app + 'lib/**/*aria*.js', app + 'lib/**/*.js',
    '!' + app + 'lib/**/please-wait*.js'
  ];

  ////////////////////

  var config = {

    apiProxy:   'http://localhost:3000/api/',
    // authProxy:  'http://localhost:3000/',

    // Bower and Node package config
    bower: {
      json: require('./bower.json'),
      directory: './vendor',
      ignorePath: '../..',
      rc: './.bowerrc'
    },
    karmaFiles: karmaFiles(),

    // Development
    dev: {
      client: app,
      css: {
        app:      app + 'assets/styles/app.scss',
        compiled: app + 'assets/styles/app.css',
        dest:     app + 'assets/styles/',
        lib: [
          app + 'lib/**/normalize.css', app + 'lib/**/*.css',
          '!' + app + 'lib/**/please-wait.css'
        ],
        all: [
          app + '**/*.scss', app + '**/*.css', '!' + app + 'vendor{,/**}'
        ],
        splash: app + 'lib/**please-wait.css'
      },
      html: {
        index: app + 'index.html',
        templates: [
          app + '**/*.html', '!' + app + 'index.html'
        ],
        all: app + '**/*.html'
      },
      img: {
        app: app + 'assets/images/*.*'
      },
      js: {
        app: appJs,
        lib: libJs,
        splash: app + 'lib/**/please-wait*.js',
        template: {
          file: app + 'templatecache/template.js',
          dest: app + 'templatecache/',
          ref: '<script src="templatecache/template.js"></script>'
        },
        spec: specJs,
        appAndSpec: appJs.concat(specJs),
        appAndRoot: appJs.concat(rootJs)
      },
      libFolder: app + 'lib/',
    },

    // Production
    dist: {
      client: dist,
      css: {
        app: dist + 'css/**/*.css',
        dest: dist + 'css/'
      },
      html:{
        index: dist + '**/*.html',
        dest: dist
      },
      img: {
        app: dist + 'img/**/*.*',
        dest: dist + 'img/'
      },
      js: {
        app:  distJs,
        json: dist + '**/*.json',
        dest: dist + 'js/',
        all: [distJs, distJson]
      }},

    // Plugin options
    bowerFilesOptions:  bowerFilesOptions,
    filters:            filters(),
    gulpLoadPlugins:    gulpLoadPlugins,
    templateCache:      templateCache()
  };

  return config;

  ////////////////////

  function bowerFilesOptions() {
    var options = {
      bowerJson: config.bower.json,
      bowerDirectory: config.bower.directory,
      bowerrc: config.bower.rc
    };
    return options;
  }

  function filters() {
    var options = {
      css: '**/*.css',
      lib: '**/lib.js',
      app: '**/app.js'
    };
    return options;
  }

  function gulpLoadPlugins() {
    return require('gulp-load-plugins')({
      camelize: true,
      lazy: true,
      rename: {
        'gulp-sass': 'sass',
        'gulp-autoprefixer': 'prefix'
      }
    });
  }

  function karmaFiles() {
    var first = libJs.concat(appJs);
    var files = first.concat(specJs);
    return files;
  }

  function templateCache() {
    var options = {
      file: 'template.js',
      options: {
        module: 'app.core',
        standAlone: false
      }
    };
    return options;
  }
};
