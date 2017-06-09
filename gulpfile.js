var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var sourcemaps = require("gulp-sourcemaps");
var connect = require('gulp-connect');
var del = require("del");
// Load plugins
var $ = require('gulp-load-plugins')();

var paths = {
    html:["demo/**/*.html"],
    scripts:["src/**/*.js"],
    build:"build",
    wy_query:"wyJquery.js",
    wy_query_min:"wyJquery.min.js"
};

gulp.task("del",()=>{
    "use strict";
    return del(paths.build);
});

gulp.task("scripts",["del"],()=>{
    "use strict";
    return gulp.src(paths.scripts)
        .pipe($.plumber())
        .pipe(concat(paths.wy_query))
        .pipe($.babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest(paths.build));
});

gulp.task("uglify",["del","scripts"],()=>{
    "use strict";
   return gulp.src(paths.build+"/"+paths.wy_query)
       .pipe(sourcemaps.init())
       .pipe(uglify())
       .pipe(concat(paths.wy_query_min))
       .pipe(sourcemaps.write())
       .pipe(gulp.dest(paths.build));
});

gulp.task("watch",()=>{
    "use strict";
    gulp.watch(paths.scripts,["uglify"]);
    gulp.watch(paths.html, ['reload']);
});

gulp.task('connect', function() {
    connect.server({
        root: './',
        livereload: true
    });
});

gulp.task('reload', function () {
    gulp.src(paths.html)
        .pipe(connect.reload());
});

gulp.task("default",["connect","watch","uglify"]);