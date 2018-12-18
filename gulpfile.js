var gulp = require('gulp');
var bs = require('browser-sync').create();
//var scss = require("gulp-scss");
var sass = require('gulp-sass');
var notify = require("gulp-notify");
var plumber = require("gulp-plumber");
var prefixer = require("gulp-autoprefixer");
var sourcemaps = require("gulp-sourcemaps");
var pug = require("gulp-pug");
var del = require("del");
var rs = require("run-sequence");
//var bemto = require('gulp-bemto');


gulp.task( 'server', ['scss', 'pug', 'copy:js', 'copy:libs', 'copy:img', 'copy:img2', 'copy:fonts'], function(){
    bs.init({
        server: {
            baseDir: './build/'
        }
    });
    
    gulp.watch( './src/pug/**/*.*', ['pug'] );
    gulp.watch( './src/assets/scss/**/*.scss', ['scss'] );
    gulp.watch( './src/assets/js/**/*.js', ['copy:js'] );
    gulp.watch( './src/assets/libs/**/*.*', ['copy:libs'] );
    gulp.watch( './src/assets/img/**/*.*', ['copy:img'] );
    gulp.watch( './src/images/**/*.*', ['copy:img2'] );
    gulp.watch( './src/assets/fonts/**/*.*', ['copy:fonts'] );
    gulp.watch( './src/assets/js/**/*.js').on('change', bs.reload );
});
gulp.task('scss', function () {
    return gulp.src('./src/assets/scss/style.scss')
        .pipe(plumber({
            errorHandler: notify.onError(function(err){
                return {
                    title: 'Styles',
                    message: err.message
                }
            })
        }))
        .pipe( sourcemaps.init() )
        //.pipe( scss() )
        .pipe( sass() )
        .pipe( prefixer({
            browsers: ['last 5 versions'],
            cascade: false
        }) )
        .pipe( sourcemaps.write() )        
        .pipe( gulp.dest('./build/assets/css') )
        .pipe( bs.stream() );
});
gulp.task('pug', function(){
    return gulp.src('./src/pug/*.pug')
        .pipe(plumber({
            errorHandler: notify.onError(function(err){
                return {
                    title: 'Pug',
                    message: err.message
                }
            })
        }))
        //.pipe(bemto())
        .pipe( pug({
            pretty: true
        }) )
        .pipe( gulp.dest('./build') )
        .pipe( bs.stream() );
});
gulp.task('copy:js', function(){
    return gulp.src('./src/assets/js/**/*.*')
        .pipe( gulp.dest('./build/assets/js') )
        .pipe( bs.stream() );
    
});
gulp.task('copy:libs', function(){
    return gulp.src('./src/assets/libs/**/*.*')
        .pipe( gulp.dest('./build/assets/libs') )
        .pipe( bs.stream() );
});
gulp.task('copy:img', function(){
    return gulp.src('./src/assets/img/**/*.*')
        .pipe( gulp.dest('./build/assets/img') )
        .pipe( bs.stream() );
});
gulp.task('copy:img2', function(){
    return gulp.src('./src/images/**/*.*')
        .pipe( gulp.dest('./build/images') )
        .pipe( bs.stream() );
});
gulp.task('copy:fonts', function(){
    return gulp.src('./src/assets/fonts/**/*.*')
        .pipe( gulp.dest('./build/assets/fonts') )
        .pipe( bs.stream() );
});
gulp.task('clean:build', function(){
    return del('./build');
});
gulp.task( 'default', function(callback){
    rs(
        'clean:build',
        'server',
        callback
    );
} );

// gulp.task('name', ['tasks'], function(){ });