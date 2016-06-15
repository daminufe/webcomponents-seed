'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./config');

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;
var _ = require('lodash');

gulp.task('styles', function () {

    // var injectFiles = gulp.src([
    //     path.join(conf.paths.src, '/assets/sass/**/*.scss'),
    //     path.join('!' + conf.paths.src, '/assets/sass/main.scss')
    // ], { read: false });

    return gulp.src([conf.paths.src + '/assets/sass/main.scss'])
        // .pipe($.inject(injectFiles))
        .pipe(wiredep(_.extend({}, conf.wiredep)))
        .pipe($.sourcemaps.init())
        .pipe($.sass.sync().on('error', $.sass.logError))
        .pipe($.autoprefixer()).on('error', conf.errorHandler('Autoprefixer'))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/css')))
        .pipe(browserSync.reload({ stream: true }));
});
