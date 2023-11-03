const { src, dest, parallel, series, watch, lastRun } = require('gulp');
// const uglify = require('gulp-uglify');
const concatCss = require('gulp-concat-css');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const fileinclude = require('gulp-file-include');
const rename = require("gulp-rename");
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');
const markdown = require('gulp-remarkable');
const browserSyncObj = require('browser-sync').create();
const through2 = require('through2');

function watcherFn() {
  watch('src/js/*.*', {events: 'all'}, function (cb) {
    jsFn();
    // console.log('JS changes...');
    cb();
  });

  watch('src/data/*', {events: 'all'}, function (cb) {
    dataFn();
    // console.log('Data directory changes...');
    cb();
  });

  watch('src/*.html', {events: 'all'}, function (cb) {
    htmlFn();
    // console.log('HTML changes...');
    cb();
  });

  watch('__pages/*.md', {events: 'all'}, function (cb) {
    mdFn();
    // console.log('MD changes...');
    cb();
  });

  watch('src/css/*.*', {events: 'all'}, function (cb) {
    cssFn();
    console.log('CSS changes...');
    cb();
  });
}

// ####################################################################
function dataFn() {
  return src(['src/data/layers.jsonl'])
    // .pipe(through2.obj(function(file, encoding, callback) {
    //   // write your custom function here
    //   // console.log(encoding)
    //   // this.push(file);
    //   callback();
    // }))
    .pipe(dest('dist/'))
    .on('end', function(){
      browserSyncObj.reload()
      console.log('dataFn ran...');
    });
}

function mdFn() {
  return src(['__pages/1.md','__pages/2.md','__pages/3.md','__pages/4.md','__pages/5.md'], { since: lastRun(mdFn) })
    .pipe(markdown({preset: 'commonmark'}))
    .pipe(rename(['1.html','2.html','3.html','4.html','5.html']))
    .pipe(dest('src/html_pages/'))
    .on('end', function(){
        htmlFn();
        console.log('mdFn ran...');
    });
}

function cssFn() {
  return src('src/css/*.css', {since: lastRun(cssFn)})
    .pipe(concatCss("styles.css"))
    .pipe(sourcemaps.init())
    .pipe(cssnano())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist/'))
    .on('end', function(){
        browserSyncObj.reload()
        console.log('cssFn ran...');
    });
}

function htmlFn(){
  return src('src/index_template.html', {since: lastRun(htmlFn)})
      .pipe(fileinclude({prefix: '@@', basepath: '@file'}))
      .pipe(rename("index.html"))
      .pipe(dest('./'))
      .on('end', function(){
          browserSyncObj.reload();
          console.log('htmlFn ran...');
      })
}

function jsFn() {
  return src('src/js/*.js', {since: lastRun(jsFn)})
    .pipe(concat('scripts.js'))
    // .pipe(uglify())
    .pipe(dest('dist/'))
    .on('end', function(){
        browserSyncObj.reload();
        console.log('jsFn ran...');
    });
}

// ####################################################################
async function cleanFn (){
  return src('dist/**/*', {read: false})
    .pipe(clean());
}

// ####################################################################
function serveFn(){
  browserSyncObj.init(

    // we don't actually use browserSync watch
    // instead we process our files then call browserSyncObj.reload()
    {
      watch: false,
      // watchOptions: {
      //     ignoreInitial: true
      // },
      // files: ['index.html','dist/*.*, dist/**/*.*'],
      server: {
          baseDir:"./"
      }
    });
}


async function reloadFn(){
  console.log('reloadFn');
  browserSyncObj.reload({});
}



// ####################################################################
// exports
exports.js = jsFn;
exports.css = cssFn;
exports.html = htmlFn;
exports.markdown = mdFn;
exports.data = dataFn;
exports.clean = cleanFn;

exports.reload = reloadFn;

exports.build = series(
  parallel(cleanFn,mdFn),
  parallel(htmlFn, cssFn, jsFn, dataFn)
);

exports.make = series(
  parallel(cleanFn,mdFn),
  parallel(htmlFn, cssFn, jsFn, dataFn)
);

exports.watch = watcherFn;

exports.default = parallel(serveFn,watcherFn);


// ####################################################################
// ####################################################################


//
// // All paths
// const paths = {
//   html: {
//     src: ['./src/*.html'],
//     dest: './dist/',
//   },
//   images: {
//     src: ['./src/images/*'],
//     dest: './dist/images/',
//   },
//   styles: {
//     src: ['./src/styles/*.css'],
//     dest: './dist/css/',
//   },
//   scripts: {
//     src: ['./src/js/**/*.js'],
//     dest: './dist/js/',
//   },
//
// };
//
// // Copy html files
// function copyHtml() {
//   return src(paths.html.src).pipe(dest(paths.html.dest));
// }
//
// // Optimize images(.png, .jpeg, .gif, .svg)
// /**
//  * Custom options
//  * imagemin([
//  *       imagemin.gifsicle({ interlaced: true }),
//  *       imagemin.mozjpeg({ quality: 75, progressive: true }),
//  *       imagemin.optipng({ optimizationLevel: 5 }),
//  *       imagemin.svgo({
//  *         plugins: [{ removeViewBox: true }, { cleanFnIDs: false }],
//  *       })
//  *     ])
//  */
// function optimizeImages() {
//   return src(paths.images.src)
//     .pipe(imagemin().on('error', (error) => console.log(error)))
//     .pipe(dest(paths.images.dest));
// }
//
// // Compile styles
// /**
//  * To concat styles, add below code after sourcemaps is initialized
//  * .pipe(concat('{OutputFileName}.css'))
//  *
//  * Note - Not all plugins work with postcss, only the ones mentioned in their documentation
//  */
// function compileStyles() {
//   return src(paths.styles.src)
//     .pipe(sourcemaps.init())
//     .pipe(sass().on('error', sass.logError))
//     .pipe(postcss([autoprefixer(), cssnano()]))
//     .pipe(rename({ suffix: '.min' }))
//     .pipe(sourcemaps.write('.'))
//     .pipe(dest(paths.styles.dest));
// }
//
// // Minify scripts
// /**
//  * To concat scripts, add below code after sourcemaps is initialized
//  * .pipe(concat('{OutputFileName}.js'))
//  */
// function minifyScripts() {
//   return src(paths.scripts.src)
//     .pipe(sourcemaps.init())
//     .pipe(terser().on('error', (error) => console.log(error)))
//     .pipe(rename({ suffix: '.min' }))
//     .pipe(sourcemaps.write('.'))
//     .pipe(dest(paths.scripts.dest));
// }
//
// // Cache bust
// /**
//  * For cache bust, include 'cache_bust' parameter with any number to all styles and scripts links
//  * For e.g. -
//  * <link rel="stylesheet" href="/dist/css/style.min.css?cache_bust=123" />
//  * <script src="/dist/js/script.min.js?cache_bust=123"></script>
//  */
// function cacheBust() {
//   return src(paths.cachebust.src)
//     .pipe(replace(/cache_bust=\d+/g, 'cache_bust=' + new Date().getTime()))
//     .pipe(dest(paths.cachebust.dest));
// }
//
// // Watch for file modification at specific paths and run respective tasks accordingly
// function watcher() {
//   watch(paths.html.src, series(copyHtml, cacheBust));
//   watch(paths.images.src, optimizeImages);
//   watch(paths.styles.src, parallel(compileStyles, cacheBust));
//   watch(paths.scripts.src, parallel(minifyScripts, cacheBust));
// }
//
// // Export tasks to make them public
// exports.html = copyHtml;
// exports.img = optimizeImages;
// exports.css = compileStyles;
// exports.js = minifyScripts;
// exports.watcher = watcher;
// exports.default = series(
//   parallel(html, img, css, js),
//   cacheBust,
//   watcher
// );
