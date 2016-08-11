const gulp = require('gulp');
const runSequence = require('run-sequence');
const {spawn} = require('child_process');

gulp.task('push', (callback) => {
  spawn('cf', ['push'], {stdio: 'inherit', env: process.env}).once('close', callback);
});

gulp.task('copy-staticfile', () => {
  return gulp.src('Staticfile').pipe(gulp.dest('public'));
});

gulp.task('copy-vendor', () => {
  return gulp.src('vendor/*.js').pipe(gulp.dest('public'));
});

gulp.task('deploy', (done) => {
  const {NODE_ENV: env} = process.env;
  process.env.NODE_ENV = 'production';
  runSequence('assets', 'copy-staticfile', 'copy-vendor', 'push', () => {
    process.env.NODE_ENV = env;
    done();
  });
});
