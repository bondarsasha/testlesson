'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sync = require('browser-sync');

var path = {
    src: { 
        html: 'dev/*.html',
        css: 'dev/css/'
    },
    watch: {
        html: 'dev/**/*.html',
        scss: 'dev/scss/**/*.scss'        
    },
    basedir: 'dev/'
}; 

gulp.task('sass', function() {
    gulp.src(path.watch.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(path.src.css))
});



gulp.task('sync:server', function() {
    sync({
        server: {
            baseDir: path.basedir            
        },
        port: 8080,
        open: true,
        notify: false
    });
});

gulp.task('sync:html', function() {
    return gulp.src(path.watch.html)
        .pipe(sync.reload({
            stream: true
        }));    
});

gulp.task('sync:sass', function() {
    return gulp.src(path.watch.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(path.src.css))
        .pipe(sync.reload({
            stream: true
        }));
});
gulp.task('watch',['sync:server', 'sync:html', 'sync:sass'], function() {
    gulp.watch(path.watch.scss, ['sync:sass']); 
    gulp.watch(path.watch.html, ['sync:html']); 
});