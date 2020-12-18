"use strict";

const { watch, src, dest, parallel } = require('gulp'),
    rename = require('gulp-rename'),
    csso = require('gulp-csso'),
    sass = require('gulp-sass'),
    Fiber = require('fibers'),
    dartSass = require('dart-sass'),
    markdown = require('gulp-markdown'),
    nunjucks = require('nunjucks'),
    njMarkdown = require('nunjucks-markdown'),
    marked = require('marked'),
    gulpNunjucks = require('gulp-nunjucks'),
    livereload = require('gulp-livereload'),
    http = require('http'),
    st = require('st'),
    data = require('gulp-data');

const metadata = require('./documentation/src/metadata.json')
const templates = 'documentation/src';
/* nunjucks markdown setup via https://gist.github.com/kerryhatcher/1382950af52f3082ecdc668bba5aa11b */
// The templates folder tells the nunjuck renderer where to find any *.njk files you source in your *.html files. 
const env = new nunjucks.Environment(new nunjucks.FileSystemLoader(templates));
const markedOptions = {
    // renderer: new marked.Renderer(),
    // gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    smartLists: true,
    smartypants: false
}
marked.setOptions();

// This takes the freshley created nunjucks envroment object (env) and passes it to nunjucks-markdown to have the custom tag regestered to the env object.
// The second is the marked library. anything that can be called to render markdown can be passed here. 
njMarkdown.register(env, marked);

// =======================================================================
// Index Task (Generate pages from template *.html files.)
// =======================================================================
function buildHtml() {
    // Gets .html files. see file layout at bottom
    return src('documentation/**/*.md')
        // .pipe(rename(path => {
        //     if (path.basename === 'README') {
        //         path.basename = 'index';
        //     }
        //     console.log(arguments);
        // }))
        .pipe(markdown(markedOptions))
        .pipe(data(() => metadata))
        // Renders template with nunjucks and marked
        .pipe(gulpNunjucks.compile(data, { env: env }))
        // // Uncomment the following if your source pages are something other than *.html. 
        // .pipe(rename(function (path) { 
        //     path.extname=".html" 
        //     console.log('renaming ', path.basename)
        // }))
        // output files in dist folder
        .pipe(dest('dist/documentation/'))
        .pipe(
            data(buffer => console.log(buffer.history))
        )
        .pipe(livereload());
};

/* Compile and process SCSS and CSS */
sass.compiler = dartSass;
function compile() {
    return src(['src/global.scss','src/utilities.scss'])
        .pipe(sass({fiber: Fiber}).on('error', sass.logError))
        .pipe(dest('dist/'))
        .pipe(livereload());
}

function compress() {
    return src(['dist/global.css', 'dist/utilities.css'])
        .pipe(csso({sourceMap: true}))
        .pipe(rename({extname: '.min.css'}))
        .pipe(dest('dist/', { sourcemaps: '.'}))
}

function server(cb) {
    return http.createServer(
        st({ path: __dirname + '/dist/', index: 'documentation/index.html', cache: false })
    ).listen(8080, cb);
};

function watchAll() {
    livereload.listen();
    watch('src/**/*.scss', compile);
    watch(['README.md', 'documentation/src/**/*.+(md|njk)'], buildHtml);
}

exports.server = server;
exports.docs = buildHtml;
exports.compress = compress;
exports.serve = parallel(server, watchAll);
