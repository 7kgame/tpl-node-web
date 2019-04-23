'use strict';

const gulp = require('gulp');
const rimraf = require('gulp-rimraf');
const tslint = require('gulp-tslint');
const mocha = require('gulp-mocha');
const shell = require('gulp-shell');
const env = require('gulp-env');
const nodemon = require('gulp-nodemon');
const bs = require('browser-sync').create();
const proxy = require('http-proxy-middleware')

/**
 * Remove build directory.
 */
gulp.task('clean', function () {
  return gulp.src(outDir, {
    read: false
  })
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
    .pipe(gulp.dest('./build/src/config'));
});

/**
 * Copy view files
 */
gulp.task('view', (cb) => {
  return gulp.src('src/view/**/*.*')
    .pipe(gulp.dest('./build/src/view'));
});

/**
 * Copy assets files
 */
gulp.task('assets', (cb) => {
  return gulp.src('assets/**/*.*')
    .pipe(gulp.dest('./build/assets'));
});

/**
 * Build the project.
 */
gulp.task('build', gulp.series('tslint', 'compile', 'configs', 'view', 'assets', (done) => {
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
    .pipe(mocha({
      exit: true
    }))
    .once('error', (error) => {
      console.log(error);
      process.exit(1);
    });
}));

/**
 * Run nodemon.
 */
gulp.task('nodemon', function nodemonCreate(done) {
  let started = false
  nodemon({
    script: './build/src/index.js',
    ext: 'js html css',
    env: {
      'NODE_ENV': 'development'
    }
  }).on('start', function startEvent() {
    if (!started) {
      started = true
      setTimeout(function () {
        bs.reload();
        done()
      }, 500);
      done()
    }
  }).on('restart', function restartEvent() {
    setTimeout(function () {
      bs.reload();
      done()
    }, 500);
  })
})

/**
 * When started, delay refresh
 */
gulp.task('bs-delay', function bsDelay(done) {
  setTimeout(function () {
    bs.reload();
    done()
  }, 1000);
});


/**
 * Start the service
 */
gulp.task('server', gulp.series('nodemon', 'bs-delay', function browserSync(done) {
  bs.init({
    proxy: {
      target: 'http://localhost:3000',
      // 代理
      middleware: [proxy([], {
        target: '',
        changeOrigin: true
      })]
    },
    port: 3001,
    notify: false // 更新提示关闭
  }, () => {
    done()
  })

}))

/**
 * Start the service and package it
 */
gulp.task('server:build', gulp.series('build', 'server', function browserSync(done) {
  done()
}))



gulp.task('default', gulp.series('build'));
