'use-strict';

let gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	del = require('del');
	browserSync = require('browser-sync').create();
	reload = browserSync.reload;
	neat = require('node-neat');

gulp.task('concatScripts',['clean'], ()=> {
return gulp.src('js/app/main.js')
	.pipe(sourcemaps.init())
	.pipe(concat('app.js'))
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('js'))
});

gulp.task('minifyScripts', ['concatScripts'], ()=>{
return gulp.src('js/app.js')
	.pipe(uglify())
	.pipe(rename('app.min.js'))
	.pipe(gulp.dest('js'))
});

gulp.task('sass', ()=>{
return gulp.src('scss/app.scss')
	.pipe(sourcemaps.init())
	.pipe(sass({
		includePaths: require('node-neat').includePaths
	}))
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('css'))
	.pipe(reload({stream: true}));
});


gulp.task('watchFiles', ()=>{
	 browserSync.init({
        server: "./"
    });
	gulp.watch('scss/**/*.scss', ['sass']);
	gulp.watch('js/**/*.js', ['concatScripts']);
});

gulp.task('clean', ()=>{
	del(['dist', 'css/app.css*', 'js/app*.js*']);
})

gulp.task('build',['minifyScripts', 'sass'], ()=>{
	return gulp.src(["css/application.css", "js/app.min.js", 'index.html',
						"img/**", "fonts/**"], { base: './'})
			.pipe(gulp.dest('dist'));
});

gulp.task('serve', ['watchFiles']);


gulp.task('default', ['clean'], ()=>{
	gulp.start('build');
});