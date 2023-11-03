const gulp = require('gulp');
// const minify = require('gulp-minify');
const { src, dest, watch, series, parallel } = require('gulp');
// // const imagemin = require('gulp-imagemin');
// const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
// const rename = require('gulp-rename');
// const replace = require('gulp-replace');
// const postcss = require('gulp-postcss');
// const autoprefixer = require('autoprefixer');
// const cssnano = require('cssnano');

const paths = {
  html: {
    src: ['./src/**/*.html'],
    dest: './dist/',
  },
  images: {
    src: ['./src/images/**/*'],
    dest: './dist/content/images/',
  },
  styles: {
    src: ['./src/styles/*.scss'],
    dest: './dist/css/',
  },
  scripts: {
    src: ['./src/scripts/*.js'],
    dest: './dist/script.js',
  },
};

function js() {
  return src(scripts.src)
    .pipe(gulpPlugin())

    .pipe(dest(scripts.dest));
}




function sass(cb) {
  // place code for your default task here
  cb();
}


// gulp.task('sass', function sassFunc(){
//   return gulp.src('./src/sass/*.scss')
//     .pipe(sass())
//     .pipe(concatCss('custom.css'))
//     .pipe(gulp.dest('./dist/css'))
// });
//
gulp.task('compress', function compressFunc() {
  return gulp.src('./dist/css/custom.css')
    .pipe(cssNano())
    .pipe(gulp.dest('./dist/css'));
});
//
// gulp.task('compressJs', function() {
//   gulp.src(['./src/js/*.js'])
//     .pipe(minify())
//     .pipe(gulp.dest('./dist/js'))
// });
//
//
// gulp.task('watch', function watchFunc() {
//   gulp.watch('./src/sass/*.scss', gulp.series('sass', 'compress'));
//   gulp.watch('./src/js/*.js', gulp.series('compressJs'));
// });




// const gulp = require('gulp');
// const concatCss = require('gulp-concat-css');
// const cssNano = require('gulp-cssnano')
// const minify = require('gulp-minify');
//
//
// function scripts(cb) {
//   // body omitted
//   cb();
// }
//
//
// //
// // gulp.task('scripts', function() {
// //   return gulp.src('./src/scripts/*.js')
// //     .pipe(concat('script.js'))
// //     .pipe(gulp.dest('./'));
// // });
// //
//
// function livereload(cb) {
//   // body omitted
//   cb();
// }
//
// gulp.task('compress', function compressFunc() {
//   return gulp.src('./dist/css/custom.css')
//     .pipe(cssNano())
//     .pipe(gulp.dest('./dist/css'));
// });
//
//
function defaultTask(cb) {
  // place code for your default task here
  cb();
}

exports.default = defaultTask
