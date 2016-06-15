// /**
//  * Created by Joao on 26/04/16.
//  */
//
// var gulp = require('gulp');
// var exec = require('child_process').exec;
// var args = require('yargs').argv;
// var async = require('async');
// var del = require('del');
// var $ = require('gulp-load-plugins')({lazy:true});
// var conf = require('./gulp.config');
//
// var commonUtils = require('./utils/common.utils')();
//
// module.exports = function(utils,config) {
//
//     var widgetName = config.widgetName;
//     var devWidgetsFolder = "bars/dev-widgets";
//
//     gulp.task('watch',function() {
//
//         commonUtils.log('Watching files for: ' + widgetName);
//         // Watch all the JS, HTML and LESS files for changes
//         gulp.watch([
//                 config.lessFiles,
//                 config.htmlFiles].concat(config.jsFiles),
//             ['deploy']);
//     });
//
//     gulp.task('inject',['scripts','styles'], function(callback) {
//         commonUtils.log('Injecting');
//
//        
//     });
//
//     gulp.task('styles', function(callback) {
//         commonUtils.log('Compiling styles');
//         return gulp.src(conf.paths.src + '/app/sass/**/*.scss')
//             .pipe($.sourcemaps.init())
//             .pipe($.sass().on('error', $.sass.logError))
//             .pipe($.sourcemaps.write())
//             .pipe(gulp.dest(conf.paths.tmp + '/serve/app/'));
//     });
//
//     // Inject all the required libs and css into the index.html file
//     function injectDependenciesOnIndexHTML(individualConfig, callback) {
//         async.series([
//             function(callback) {
//                 commonUtils.log('Compiling LESS to CSS and Injecting styles');
//
//                
//             },
//             function (callback) {
//                 commonUtils.log('Injecting bower CSS and JS and app JS files into index.html');
//                 var wiredep = require('wiredep').stream;
//                 var options = {
//                     bowerJson: require('../../'+individualConfig.widgetName+'/bower.json'),
//                     directory: individualConfig.appFolder + '/libs/',
//                     ignorePath: '../..'
//                 };
//                 gulp.src(individualConfig.index)
//                     .pipe($.plumber())
//                     .pipe(wiredep(options))
//                     .pipe(commonUtils.inject(individualConfig.jsFiles,'', individualConfig.jsOrder))
//                     .pipe($.inject(gulp.src(individualConfig.cssFiles, {read: false}), {relative: true}))
//                     .pipe(gulp.dest(individualConfig.appFolder))
//                     .on('end', function() {
//                         callback();
//                     });
//             }
//         ], function (err) {
//             if(err)
//                 console.log(err);
//             callback();
//         });
//     }
//
//     gulp.task('clean-dev-widgets-folder', function(callback) {
//         del(devWidgetsFolder, {force: true}, callback);
//     });
// };
