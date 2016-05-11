# gulp-htmlhint-checkstyle-file-reporter
Writes checkstyle output to a file. This can be used to report [gulp-htmlhint](https://www.npmjs.com/package/gulp-htmlhint) results to Jenkins.

## Install

```bash
$ npm i -D gulp-htmlhint-checkstyle-file-reporter
```
## Usage

### [gulp-htmlhint](https://www.npmjs.com/package/gulp-htmlhint)

```javascript
var gulp = require('gulp');

// You can specify file name optionally,
// default file name is 'htmlhint-checkstyle.xml'
process.env.HTMLHINT_CHECKSTYLE_FILE = 'reports/htmlhint-checkstyle.xml'

gulp.task('htmlhint', function() {
  var htmlhint = require('gulp-htmlhint');
  gulp.src(['index.html'])
    .pipe(htmlhint('.htmlhintrc'))
    .pipe(htmlhint.reporter('gulp-htmlhint-checkstyle-file-reporter'));
});
```

## Related

*   [HTMLHint](https://github.com/yaniswang/HTMLHint)
*   [gulp-htmlhint](https://github.com/bezoerb/gulp-htmlhint)
*   [jshint-checkstyle-file-reporter](https://github.com/mila-labs/jshint-checkstyle-file-reporter)
*   [htmlhint-checkstyle](https://github.com/satoru-matsumoto/htmlhint-checkstyle)

## License

[MIT](https://github.com/muraken720/gulp-htmlhint-checkstyle-file-reporter/blob/master/LICENSE) © [Kenichiro Murata](https://github.com/muraken720)
