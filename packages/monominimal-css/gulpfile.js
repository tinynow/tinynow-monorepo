"use strict";

const { watch, src, dest } = require('gulp'),
    rename = require('gulp-rename'),
    csso = require('gulp-csso'),
    sass = require('gulp-sass'),
    Fiber = require('fibers'),
    dartSass = require('dart-sass'),
    markdown = require('gulp-markdown'),
    nunjucks = require('nunjucks'),
    njMarkdown = require('nunjucks-markdown'),
    marked = require('marked'),
    gulpNunjucks = require('gulp-nunjucks');


const templates = 'documentation/src';

/* nunjucks markdown setup via https://gist.github.com/kerryhatcher/1382950af52f3082ecdc668bba5aa11b */
// The templates folder tells the nunjuck renderer where to find any *.njk files you source in your *.html files. 
var env = new nunjucks.Environment(new nunjucks.FileSystemLoader(templates));

marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    smartLists: true,
    smartypants: false
});

// This takes the freshley created nunjucks envroment object (env) and passes it to nunjucks-markdown to have the custom tag regestered to the env object.
// The second is the marked library. anything that can be called to render markdown can be passed here. 
njMarkdown.register(env, marked);

// =======================================================================
// Index Task (Generate pages from template *.html files.)
// =======================================================================
function buildHtml() {
    // Gets .html files. see file layout at bottom
    return src(['README.md', 'documentation/src/**/*.html'])
        // Renders template with nunjucks and marked
        .pipe(gulpNunjucks.compile("", { env: env }))
        // Uncomment the following if your source pages are something other than *.html. 
        .pipe(rename(function (path) { 
            if (path.basename === 'README') {
                path.basename = 'index';
            } 
            path.extname=".html" 
        }))
        // output files in dist folder
        .pipe(dest('documentation/dist'))
};

/* Compile and process SCSS and CSS */
sass.compiler = dartSass;
function compile() {
    return src(['src/global.scss','src/utilities.scss'])
        .pipe(sass({fiber: Fiber}).on('error', sass.logError))
        .pipe(dest('dist/'));
}

function compress() {
    return src(['dist/global.css', 'dist/utilities.css'])
        .pipe(csso({sourceMap: true}))
        .pipe(rename({extname: '.min.css'}))
        .pipe(dest('dist/', { sourcemaps: '.'}))
}

function renderMarkdown() {
    return src('src/**/*.md')
        .pipe(markdown())
        .pipe(dest('dist/documentation/'))
}

function serve() {
    watch('src/**/*.scss', compile);
    watch('src/**/*.md', renderMarkdown)
}

// function defaultTask(cb) {
//     // place code for your default task here
//     cb();
// }

exports.docs = buildHtml;
exports.compress = compress;
exports.serve = serve;
// exports.docs = renderMarkdown;
