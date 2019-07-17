'use strict';

function htmlHighlighter(html, params) {
  html = _cleanSource(html);

  const lines = html.split('\n');

  const ltPattern = /&lt;/g;
  const gtPattern = /&gt;/g;
  const slashPattern = /&slash;/g;
  const tagPattern = /(?:&lt;|&lt;&slash;)(\w+)/g; // $1
  const attrsPattern = /(?!\s*&lt;.*)([\w-]+)(?==<.+&gt;)/g; // $1
  const stringsPattern = /(?!\s*&lt;)("[\w\s-_!@#$%^&*().:;]*")/g; // $1

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    line = line.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    line = line.replace(/\//g, '&slash;');

    const strings = line.match(stringsPattern);

    if (strings) {
      strings.forEach(string => {
        line = line.replace(string, _wrap(string, 'cm-string'));
      });
    }

    const attrs = line.match(attrsPattern);

    if (attrs) {
      attrs.forEach(attr => {
        line = line.replace(attrsPattern, _wrap('$1', 'cm-attribute'));
      });
    }

    const tags = line.match(tagPattern);

    if (tags) {
      tags.forEach(tag => {
        const splitArr = tag.split(';');
        const wrappedTag = _wrap(splitArr.pop(), 'cm-tag');

        splitArr.push(wrappedTag);
        const newTag = splitArr.join(';');

        line = line.replace(tag, newTag);
      });
    }

    const lts = line.match(ltPattern);

    if (lts) {
      line = line.replace(ltPattern, _wrap(lts[0], 'cm-bracket cm-tag'));
    }

    const gts = line.match(gtPattern);

    if (gts) {
      line = line.replace(gtPattern, _wrap(gts[0], 'cm-bracket cm-tag'));
    }

    const slashes = line.match(slashPattern);

    if (slashes) {
      line = line.replace(slashPattern, _wrap('/', 'cm-slash cm-tag'));
    }

    lines[i] = line;
  }

  return lines.join('\n');
}

function _wrap(token, className) {
  return `<span class="${className}">${token}</span>`;
}

function _cleanSource(html) {
  html = html.replace(/×/g, "&times;")
    .replace(/«/g, "&laquo;")
    .replace(/»/g, "&raquo;")
    .replace(/←/g, "&larr;")
    .replace(/→/g, "&rarr;");

  var lines = html.split(/\n/);

  lines.shift();
  lines.splice(-1, 1);

  var indentSize = lines[0].length - lines[0].trim().length,
    re = new RegExp(" {" + indentSize + "}");

  lines = lines.map(function (line) {
    if (line.match(re)) {
      line = line.substring(indentSize);
    }

    return line;
  });

  lines = lines.join("\n");

  return lines;
}

module.exports = htmlHighlighter;