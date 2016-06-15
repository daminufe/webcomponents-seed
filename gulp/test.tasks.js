
var browserSync = require('browser-sync');
var commonUtils = require('./utils/common.utils')();
var gulp = require('gulp');

module.exports = function(utils,config,widgetName,dirname) {

    /**
     * Run specs once and exit
     * @return {Stream}
     */
    gulp.task('test', function (done) {
        startTests(true /*singleRun*/, done);
    });

    /**
     * Start the tests using karma.
     * @param  {boolean} singleRun - True means run once and end (CI), or keep running (dev)
     * @param  {Function} done - Callback to fire when karma is done
     * @return {undefined}
     */
    function startTests(singleRun, done) {
        var excludeFiles = [];
        var karma = require('karma').server;

        karma.start({
            configFile: dirname + '/karma.conf.js',
            exclude: excludeFiles,
            singleRun: !!singleRun
        }, karmaCompleted);

        ////////////////

        function karmaCompleted(karmaResult) {
            commonUtils.log('Karma completed');
            if (karmaResult === 1) {
                done('karma: tests failed with code ' + karmaResult);
            } else {
                done();
            }
        }
    }

    /**
     * Code testing - Run the spec runner
     * @return {Stream}
     */
    gulp.task('serve-specs', ['build-specs'], function (done) {
        commonUtils.log('run the spec runner');
        startBrowserSync(true, true);
        done();
    });

    /**
     * Inject all the spec files into the specs.html
     * @return {Stream}
     */
    gulp.task('build-specs', function () {
        if (!utils.widgetExists()) {
            commonUtils.log('Empty or invalid widget name. Please provide a valid name (Ex: gulp serve-specs --widget=Help)');
            return;
        }
        commonUtils.log('building the spec runner');

        var wiredep = require('wiredep').stream;
        var options = {
            bowerJson: require('../../' + config.widgetsFolder + widgetName + '/bower.json'),
            directory: config.widgetsFolder + widgetName + '/libs/',
            ignorePath: '../..'
        };
        var specs = config.specs;

        options.devDependencies = true;

        return gulp
            .src(config.specRunner)
            .pipe(wiredep(options))
            .pipe(commonUtils.inject(config.jsFiles, '', config.jsOrder))
            .pipe(commonUtils.inject(config.testlibraries, 'testlibraries'))
            .pipe(commonUtils.inject(config.specHelpers, 'spechelpers'))
            .pipe(commonUtils.inject(specs, 'specs', ['**/*']))
            .pipe(gulp.dest(config.appFolder));
    });

    /**
     * Start BrowserSync
     */
    function startBrowserSync(isDev, specRunner) {
        commonUtils.log('Starting BrowserSync on port ' + config.browserSyncPort);

        var options = {
            files: [config.appFolder + '/**/*.*', '!' + config.lessFiles],
            server: {
                baseDir: './'
            },
            ghostMode: { // these are the defaults t,f,t,t
                clicks: true,
                location: false,
                forms: true,
                scroll: true
            },
            injectChanges: true,
            logFileChanges: true,
            logLevel: 'info',
            logPrefix: 'rabowallet-widget-' + widgetName,
            notify: true,
            reloadDelay: 0 //1000
        };
        if (specRunner) {
            options.startPath = widgetName + '/' + config.specRunnerFile;
        }

        browserSync(options);
    }
};