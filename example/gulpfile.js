'use strict'

var checkstyleFileReporter = require('../')

var gulp = require('gulp')
var del = require('del')
var vinylPaths = require('vinyl-paths')
var htmlhint = require('gulp-htmlhint')
var concat = require('gulp-concat')
var header = require('gulp-header')
var footer = require('gulp-footer')

var REPORT_DIR = 'reports/'
var FILE_NAME = 'htmlhint-checkstyle.xml'

process.env.HTMLHINT_CHECKSTYLE_FILE = REPORT_DIR + FILE_NAME

gulp.task('clean', function () {
  return del([REPORT_DIR + '*.*'])
})

gulp.task('htmlhint', ['clean'], function () {
  gulp.src('app/**/*.html')
      .pipe(htmlhint('.htmlhintrc'))
      .pipe(htmlhint.reporter(checkstyleFileReporter))
      .pipe(gulp.dest(REPORT_DIR + '.tmp'))
      .on('end', function () {
        gulp.src(REPORT_DIR + '*.tmp.*')
            .pipe(vinylPaths(del))
            .pipe(concat(FILE_NAME))
            .pipe(header('<?xml version="1.0" encoding="utf-8"?>\n<checkstyle version="4.3">\n'))
            .pipe(footer('\n</checkstyle>'))
            .pipe(gulp.dest(REPORT_DIR))
            .on('end', function () {
              del([REPORT_DIR + '.tmp'])
            })
      })
})

gulp.task('default', ['htmlhint'])

