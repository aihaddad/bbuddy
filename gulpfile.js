// Gulp and configuration
var gulp   = require('gulp');
var config = require('./gulp.conf')();
var $      = config.gulpLoadPlugins();
// Other Node libraries
var args           = require('yargs').argv;
var browserSync    = require('browser-sync');
var browserSyncSpa = require('browser-sync-spa');
var bowerFiles     = require('main-bower-files');
var del            = require('del');
var exec           = require('child_process').exec;
var exists         = require('path-exists').sync;
var reload         = browserSync.reload;

////////////////////

// General purpose

gulp.task('clean', [
  'clean-html', 'clean-images', 'clean-scripts', 'clean-styles'
]);

gulp.task('default', ['help']);

gulp.task('help', $.taskListing);

gulp.task('vendor', function() {
  log('Importing Bower files into app vendor');
  // Replace files by their minified version when possible
  var bowerWithMin = bowerFiles().map(function(path, index, arr) {
    var newPath = path.replace(/.([^.]+)$/g, '.min.$1');
    return exists(newPath) ? newPath : path;
  });
  // Copy them to another directory
  return gulp
    .src(bowerWithMin)
    .pipe(gulp.dest(config.dev.libFolder));
});

// Scripts

gulp.task('clean-scripts', function(done) {
  clean(config.dev.js.template.file);
  clean(config.dist.js.all, done);
});

gulp.task('lint', function() {
  log('Analyzing source with JSHint');

  return gulp
    .src(config.dev.js.appAndRoot)
    .pipe($.if(args.verbose, $.print()))
    .pipe($.jscs())
    .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
    .pipe($.jshint.reporter('fail'));
});

// Styles

gulp.task('clean-styles', function(done) {
  clean(config.dev.css.compiled);
  clean(config.dist.css.app, done);
});

gulp.task('styles', ['clean-styles'], function() {
  log('Compiling SASS to CSS');

  return gulp
    .src(config.dev.css.app)
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.prefix({browsers: ['last 3 versions', '> 1%', 'Firefox 14']}))
    .pipe(gulp.dest(config.dev.css.dest))
    .pipe($.filter(config.filters.css))
    .pipe(browserSync.reload({stream:true}));
});

// Images

gulp.task('clean-images', function(done) {
  clean(config.dist.img.app, done);
});

gulp.task('optimize-images', ['clean-images'], function() {
  log('Optimizing and copying images for production');

  return gulp
    .src(config.dev.img.app)
    .pipe($.imagemin({optimizationLevel: 4}))
    .pipe($.imagemin({
      optimizationLevel: 4,
      progressive: true,
      svgoPlugins: [{removeViewBox: false}]
    }))
    .pipe(gulp.dest(config.dist.img.dest));
});

// HTML

gulp.task('clean-html', function(done) {
  clean(config.dist.html.index, done);
});

gulp.task('inject', ['vendor', 'styles'], function() {
  log('Injecting vendor and source file references into index');

  return gulp
    .src(config.dev.html.index)
    .pipe($.inject(gulp.src(config.dev.js.lib),
      {name: 'vendor', relative: true}))
    .pipe($.inject(gulp.src(config.dev.js.splash),
      {name: 'splash', relative: true}))
    .pipe($.inject(gulp.src(config.dev.css.lib),
      {name: 'vendor', relative: true}))
    .pipe($.inject(gulp.src(config.dev.css.splash),
      {name: 'splash', relative: true}))
    .pipe($.inject(gulp.src(config.dev.css.compiled), {relative: true}))
    .pipe($.inject(gulp.src(config.dev.js.app), {relative: true}))
    .pipe(gulp.dest(config.dev.client));
});

gulp.task('template-cache', ['clean-scripts'], function() {
  log('Adding HTML templates to Angular $templateCache');

  return gulp
    .src(config.dev.html.templates)
    .pipe($.replace('../../assets/images/', 'img/'))
    .pipe($.minifyHtml({empty: true}))
    .pipe($.angularTemplatecache(config.templateCache.file, config.templateCache.options))
    .pipe(gulp.dest(config.dev.js.template.dest));
});

// Testing

// To-do

// Development server

gulp.task('serve-dev', ['clean-scripts', 'styles'], function() {
  if (args.stack) {
    exec('foreman start');
  }

  browserSync.use(browserSyncSpa({
    selector: '[ng-app]'// Only needed for angular apps
  }));

  browserSync({
    open: false,
    port: 3100,
    server: {
      baseDir: config.dev.client
    },
    middleware: proxyMiddleware()
  });

  gulp.watch(config.dev.css.all, ['styles']);
  gulp.watch(config.dev.html.all).on('change', reload);
  gulp.watch(config.dev.js.app).on('change', reload);
});

gulp.task('s',  ['serve-dev']); /* alias */

// Build pipeline

gulp.task('build', ['move-splash', 'optimize', 'optimize-images']);

gulp.task('optimize', ['inject', 'template-cache', 'styles'], function() {
  log('Optimizing JS, CSS and HTML');

  var assets      = $.useref.assets({searchPath: config.dev.client}),
      jsLibFilter = $.filter(config.filters.lib),
      jsAppFilter = $.filter(config.filters.app),
      cssFilter   = $.filter(config.filters.css);

  return gulp
    .src(config.dev.html.index)
    .pipe($.plumber())
    .pipe($.replace('assets/images', 'img'))
    .pipe($.replace('lib/please-wait.css', 'css/please-wait.css'))
    .pipe($.replace('lib/please-wait.min.js', 'js/please-wait.min.js'))
    .pipe($.injectString.after('<!-- template.js -->', config.dev.js.template.ref))
    .pipe($.injectString.after('<html ng-app="app"', ' ng-strict-di'))
    .pipe(assets)
    .pipe(cssFilter)
    .pipe($.bytediff.start())
    .pipe($.csso())
    .pipe($.replace('../../assets/images/', '../img/'))
    .pipe($.bytediff.stop())
    .pipe(cssFilter.restore())
    .pipe(jsLibFilter)
    .pipe($.bytediff.start())
    .pipe($.uglify({mangle: true}))
    .pipe($.bytediff.stop())
    .pipe(jsLibFilter.restore())
    .pipe(jsAppFilter)
    .pipe($.ngAnnotate())
    .pipe($.bytediff.start())
    .pipe($.uglify({mangle: true}))
    .pipe($.bytediff.stop())
    .pipe(jsAppFilter.restore())
    .pipe($.rev())
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.revReplace())
    .pipe(gulp.dest(config.dist.client))
    .pipe($.rev.manifest())
    .pipe(gulp.dest(config.dist.client));
});

gulp.task('move-splash-css', function() {
  return gulp
    .src(config.dev.css.splash)
    .pipe(gulp.dest(config.dist.css.dest));
});

gulp.task('move-splash-js', function() {
  return gulp
    .src(config.dev.js.splash)
    .pipe(gulp.dest(config.dist.js.dest));
});

gulp.task('move-splash', ['move-splash-css', 'move-splash-js']);

gulp.task('heroku:production',  ['build']);

// Production server

gulp.task('serve-dist', ['build'], function() {
  if (args.stack) {
    exec('foreman start');
  }

  browserSync.use(browserSyncSpa({
    selector: '[ng-app]'// Only needed for angular apps
  }));

  browserSync({
    open: false,
    port: 3200,
    server: {
      baseDir: config.dist.client
    },
    middleware: proxyMiddleware('http://bbuddy.herokuapp.com/api/')
  });

  gulp.watch(config.dist.css.app).on('change', reload);
  gulp.watch(config.dist.html.index).on('change', reload);
  gulp.watch(config.dist.js.all).on('change',  reload);
});

gulp.task('sb',  ['serve-dist']); /* alias */

////////////////////

function log(msg) {
  if (typeof(msg) === 'object') {
    for (var item in msg) {
      if (msg.hasOwnProperty(item)) {
        $.util.log($.util.colors.blue(msg[item]));
      }
    }
  } else {
    $.util.log($.util.colors.blue(msg));
  }
}

function clean(link, done) {
  log('Cleaning: ' + $.util.colors.blue(link));
  del(link, done);
}

function proxyMiddleware(productionProxy) {
  // Setup proxy for /api calls
  var proxy    = require('proxy-middleware'),
      url      = require('url'),
      apiProxy = productionProxy || config.apiProxy;
  var api      = url.parse(apiProxy);
  // auth    = url.parse(config.authProxy);

  api.route   = '/api';

  return [proxy(api)];
}
