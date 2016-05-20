# gulp-htmlhint-checkstyle-file-reporter[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
Writes checkstyle output to a file. This can be used to report [gulp-htmlhint](https://www.npmjs.com/package/gulp-htmlhint) results to Jenkins.

## Install

```bash
$ npm i -D gulp-htmlhint-checkstyle-file-reporter
```
## Usage

```javascript
var gulp = require('gulp')
var del = require('del')
var vinylPaths = require('vinyl-paths')
var htmlhint = require('gulp-htmlhint')
var concat = require('gulp-concat')
var header = require('gulp-header')
var footer = require('gulp-footer')

var REPORT_DIR = 'reports/'
var FILE_NAME = 'htmlhint-checkstyle.xml'

// You can specify file name optionally,
// default file name is 'htmlhint-checkstyle.xml'
process.env.HTMLHINT_CHECKSTYLE_FILE = REPORT_DIR + FILE_NAME

gulp.task('htmlhint', ['clean'], function () {
  gulp.src('app/**/*.html')
      .pipe(htmlhint('.htmlhintrc'))
      .pipe(htmlhint.reporter('gulp-htmlhint-checkstyle-file-reporter'))
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
```

## Related

*   [HTMLHint](https://github.com/yaniswang/HTMLHint)
*   [gulp-htmlhint](https://github.com/bezoerb/gulp-htmlhint)
*   [jshint-checkstyle-file-reporter](https://github.com/mila-labs/jshint-checkstyle-file-reporter)
*   [htmlhint-checkstyle](https://github.com/satoru-matsumoto/htmlhint-checkstyle)

## License

[MIT](https://github.com/muraken720/gulp-htmlhint-checkstyle-file-reporter/blob/master/LICENSE) © [Kenichiro Murata](https://github.com/muraken720)
