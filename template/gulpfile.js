'use strict';

const gulp = require('gulp');
const rimraf = require('gulp-rimraf');
const tslint = require('gulp-tslint');
const mocha = require('gulp-mocha');
const shell = require('gulp-shell');
const env = require('gulp-env');

/**
 * Remove build directory.
 */
gulp.task('clean', function () {
  return gulp.src(outDir, { read: false })
    .pipe(rimraf());
});

/**
 * Lint all custom TypeScript files.
 */
gulp.task('tslint', () => {
  return gulp.src('src/**/*.ts')
    .pipe(tslint({
      formatter: 'prose'
    }))
    .pipe(tslint.report());
});

/**
 * Compile TypeScript.
 */

function compileTS(args, cb) {
  return exec(tscCmd + args, (err, stdout, stderr) => {
    console.log(stdout);

    if (stderr) {
      console.log(stderr);
    }
    cb(err);
  });
}

gulp.task('compile', shell.task([
  'npm run tsc',
]))

/**
 * Watch for changes in TypeScript
 */
gulp.task('watch', shell.task([
  'npm run tsc-watch',
]))

/**
 * Copy config files
 */
gulp.task('configs', (cb) => {
  return gulp.src(['src/config/**/*.yml', 'src/config/**/*.json'])
    .pipe(gulp.dest('./build/config'));
});

/**
 * Copy public files
 */
gulp.task('public', (cb) => {
  return gulp.src('public/**/*.*')
    .pipe(gulp.dest('./build/public'));
});

/**
 * Build the project.
 */
gulp.task('build', gulp.series('tslint', 'compile', 'configs', 'public', (done) => {
  console.log('Building the project ...');
  done && done();
}));

/**
 * Run tests.
 */
gulp.task('test', gulp.series('build', (cb) => {
  const envs = env.set({
    NODE_ENV: 'test'
  });

  gulp.src(['build/test/**/*.js'])
    .pipe(envs)
    .pipe(mocha({ exit: true }))
    .once('error', (error) => {
      console.log(error);
      process.exit(1);
    });
}));

gulp.task('default', gulp.series('build'));
