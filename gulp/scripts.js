'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./config');

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

gulp.task('scripts', function () {
    return gulp.src(
        [
            path.join(conf.paths.src + '/app/**/*.js'),
            path.join('!' + conf.paths.src, '/app/**/*.spec.js'),
            path.join('!' + conf.paths.src, '/app/**/*.mock.js')
        ])
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.sourcemaps.init())
        .pipe($.babel({
            presets: ['es2015']
        }))
        .pipe($.concat('all.js'))
        .pipe($.sourcemaps.write('.'))
        .pipe(browserSync.reload({ stream: true }))
        .pipe($.size())
        .pipe(gulp.dest(path.join(conf.paths.tmp,'/serve/js')));
});
