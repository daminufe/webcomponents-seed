var gulp = require('gulp');
var wrench = require('wrench');
var gutil = require('gulp-util');

/**
 *  This will load all js files in the gulp directory
 *  in order to load all gulp tasks
 */
wrench.readdirSyncRecursive('./gulp').filter(function(file) {
    return (/\.(js)$/i).test(file);
}).map(function(file) {
    require('./gulp/' + file);
});

gulp.task('default', function () {
    gutil.log(gutil.colors.blue('[' + 'Available Commands' + ']'));
    gutil.log(gutil.colors.blue('gulp'),'Lists all available gulp commands.');
    gutil.log(gutil.colors.blue('gulp serve'),'Serves the index.html page and detects changes and converts SCSS in CSS files.');
    gutil.log(gutil.colors.blue('gulp build'),'Concatenates and minifies all files per component.');
});