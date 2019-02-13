const babel = require('gulp-babel');
const concat = require('gulp-concat');
const gulp = require('gulp');
const gulpProcess = require('gulp-process');
const maps = require('gulp-sourcemaps');
const spawn = require('child_process').spawn;


//-----------------------------------------------------------------------------
// Build

gulp.task('build-css', function () {
    return gulp.src('src/**/*.css')
      .pipe(concat('main.css'))
      .pipe(gulp.dest('app/'));
});

gulp.task('build-js', () => {
        return gulp.src(['main.js', 'src/**/*.js', '!src/**/*.test.js'])
            .pipe(maps.init())
            .pipe(babel())
            .pipe(maps.write('.'))
            .pipe(gulp.dest('app/'));
});

gulp.task('build', gulp.series('build-css', 'build-js'));


//-----------------------------------------------------------------------------
// Copy

gulp.task('copy-html', () => {
    return gulp.src('src/*.html').pipe(gulp.dest('app/'));
});

gulp.task('copy-assets', () => {
    return gulp.src('assets/**/*').pipe(gulp.dest('app/assets'));
});

gulp.task('copy-constants', () => {
  return gulp.src('src/lib/constants/*.json').pipe(gulp.dest('app/lib/constants'));
});

gulp.task('copy', gulp.parallel('copy-assets', 'copy-constants', 'copy-html'));


//-----------------------------------------------------------------------------
// Execute

const args = (more) => Array.isArray(more) ? ['.'].concat(more) : ['.'];
const cmd  = (name) => `./node_modules/.bin/${name}`;
const exit = () => process.exit();

gulp.task('release', gulp.series('copy', 'build', () => {
  spawn(cmd('electron-builder'), args(), { stdio: 'inherit' }).on('close', exit);
}));

gulp.task('restart', gulp.series('copy', 'build', () => {
  return gulp.pipe(gulpProcess.restartStream('app'));
}));

gulp.task('start', gulp.series('copy', 'build', () => {
    spawn(cmd('electron'), args(), { stdio: 'inherit' }).on('close', exit);
}));

gulp.task('test', gulp.series('copy', 'build', () => {
    spawn(cmd('jest'), args(), { stdio: 'inherit' }).on('close', exit);
}));

gulp.task('watch', () => {
  gulpProcess.start('app', './app/main');
  gulp.watch('src/*.*', ['restart']);
});

