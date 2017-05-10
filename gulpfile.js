var babelify = require('babelify');
var browserify = require('browserify');
var browserSync = require('browser-sync');
var buffer = require('vinyl-buffer');
var gulp = require('gulp');
var node = require('node-dev');
var source = require('vinyl-source-stream');

function errorHandler(err) {
  console.log('Error: ' + err.message);
}

// �����u���E�U�����[�h
gulp.task('browser-sync', function() {
  browserSync({
    proxy: {
      target: 'http://localhost:3000'
    },
    port: 8080
  });
});

// Javascript�ւ̃r���h
// ES6����JSX�ȃt�@�C���Q��build/bundle.js�֕ϊ�����
gulp.task('build', function() {
  browserify({entries: ['./index.js']})
    .transform(babelify)
    .bundle()
    .on('error', errorHandler)
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./build'))
    .pipe(browserSync.reload({stream: true}));
});

// ���[�J���T�[�o�[�̋N��
gulp.task('server', function() {
  node(['./server.js']);
});

// �t�@�C���Ď�
// �t�@�C���ɍX�V����������r���h���ău���E�U�������[�h����
gulp.task('watch', function() {
  gulp.watch('./index.js', ['build']);
  gulp.watch('./index.html', ['build']);
  gulp.watch('./components/*.js', ['build']);
});

// gulp�R�}���h�ŋN�������Ƃ��̃f�t�H���g�^�X�N
gulp.task('default', ['server', 'build', 'watch', 'browser-sync']);
