const { watch, src, dest } = require('gulp');
const sass = require('gulp-sass');
sass.compiler = require('sass');


function compile(cb) {
    return src(['src/global.scss','src/utilities.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('dist/'))
}
function serve() {
    watch('src/**/*.scss', compile);
}

function defaultTask(cb) {
    // place code for your default task here
    cb();
}
exports.serve = serve;
exports.default = defaultTask;