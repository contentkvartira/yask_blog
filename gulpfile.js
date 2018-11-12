var gulp = require('gulp'),
    sass = require('gulp-sass'),
    prefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    minifycss = require('gulp-minify-css'),
    cssnano = require('gulp-cssnano'),
    cssimport = require('gulp-cssimport'),
    rename = require('gulp-rename');

gulp.task('sass', function () {
   return gulp.src('resource/sass/**/*.sass')
       .pipe(sass())
       .pipe(prefixer('last 2 versions'))
       .pipe(gulp.dest('public/css'))
       .pipe(browserSync.reload({stream: true}))
});

gulp.task('scripts', function () {
    return gulp.src([
        'resource/js/jquery.min.js',
        'resource/js/tether.min.js',
        'resource/js/bootstrap.min.js',
        'resource/js/slick.min.js'
    ])
        .pipe(concat('libs.min.js'))
        .pipe(gulp.dest('public/js'));
});

gulp.task('css-libs', function () {
   return gulp.src('resource/css/*.css')
       .pipe(minifycss())
       .pipe(concat('libs.min.css'))
       .pipe(gulp.dest('public/css'));
});

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: 'public'
        },
        notify: false
    });
});

gulp.task('watch', ['browser-sync', 'sass', 'css-libs', 'scripts'], function () {
    gulp.watch('resource/sass/**/*.sass', ['sass']);
    gulp.watch('public/*.html', browserSync.reload);
});

