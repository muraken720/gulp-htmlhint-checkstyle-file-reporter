/**
 * @author Kenichiro Murata
 * @copyright 2016 Kenichiro Murata
 * @license MIT
 * @fileoverview gulp-htmlhint checkstyle file reporter.
 */

'use strict'

var fs = require('fs')

var htmlhintResults = []

function _reporter (results) {
  var files = {}
  var out = []
  var pairs = {
    '&': '&amp;',
    '"': '&quot;',
    "'": '&apos;',
    '<': '&lt;',
    '>': '&gt;'
  }
  var fileName, i, issue, errorMessage

  function encode (s) {
    for (var r in pairs) {
      if (typeof (s) !== 'undefined') {
        s = s.replace(new RegExp(r, 'g'), pairs[r])
      }
    }
    return s || ''
  }

  results.forEach(function (result) {
    // Register the file
    result.file = result.file.replace(/^\.\//, '')
    if (!files[result.file]) {
      files[result.file] = []
    }

    // Create the error message
    errorMessage = result.error.reason

    // Add the error
    files[result.file].push({
      severity: result.error.severity,
      line: result.error.line,
      column: result.error.character,
      message: errorMessage,
      source: 'htmlhint.' + result.error.code
    })
  })

  out.push('<?xml version="1.0" encoding="utf-8"?>')
  out.push('<checkstyle version="4.3">')

  for (fileName in files) {
    if (files.hasOwnProperty(fileName)) {
      out.push('\t<file name="' + fileName + '">')
      for (i = 0; i < files[fileName].length; i++) {
        issue = files[fileName][i]
        out.push(
            '\t\t<error ' +
            'line="' + issue.line + '" ' +
            'column="' + issue.column + '" ' +
            'severity="' + issue.severity + '" ' +
            'message="' + encode(issue.message) + '" ' +
            'source="' + encode(issue.source) + '" ' +
            '/>'
        )
      }
      out.push('\t</file>')
    }
  }

  out.push('</checkstyle>')

  var filename = process.env.HTMLHINT_CHECKSTYLE_FILE || 'htmlhint-checkstyle.xml'
  fs.writeFileSync(filename, out.join('\n'))
}

module.exports = function (file) {
  htmlhintResults = htmlhintResults.concat(file.htmlhint.messages)

  return _reporter(htmlhintResults.map(function (msg) {
    return {
      file: msg.file,
      error: {
        severity: msg.error.type,
        character: msg.error.col,
        code: msg.error.rule.id,
        line: msg.error.line,
        reason: msg.error.message
      }
    }
  }))
}
