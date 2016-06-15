
var $ = require('gulp-load-plugins')({lazy:true});
var gulp = require('gulp');

module.exports = function() {

    return {
        log: log,
        inject: inject
    };

    function log(msg,color) {
        if(!color)
            color = 'blue';
        $.util.log($.util.colors[color](msg));
    }

    /**
     * Inject files in a sorted sequence at a specified inject label
     * @param   {Array} src   glob pattern for source files
     * @param   {Array} label name of injection script
     * @param   {Array} order   glob pattern for sort order of the files
     * @returns {Stream}   The stream
     */
    function inject(src, label, order) {
        var options = {read: false, relative: true};
        if (label) {
            options.name = 'inject:' + label;
        }

        return $.inject(orderSrc(src, order), options);
    }

    /**
     * Order a stream
     * @param   {Stream} src   The gulp.src stream
     * @param   {Array} order Glob array pattern
     * @returns {Stream} The ordered stream
     */
    function orderSrc(src, order) {
        //order = order || ['**/*'];
        return gulp
            .src(src)
            .pipe($.if(order, $.order(order)));
    }
};
