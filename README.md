# @ig0rkin/html-syntax-highlighter


[![npm (scoped)](https://img.shields.io/npm/v/@ig0rkin/html-syntax-highlighter.svg)](https://www.npmjs.com/package/@ig0rkin/html-syntax-highlighter)
[![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/@ig0rkin/html-syntax-highlighter.svg)](https://www.npmjs.com/package/@ig0rkin/html-syntax-highlighter)

Lightweight library to highlight html syntax

## Install

```
$ npm install @ig0rkin/html-syntax-highlighter
```

## Usage

```js
const htmlHighlighter = require('@ig0rkin/html-syntax-highlighter');
let html = `<h1 class="headline">Hello world!</h1>`;

html = htmlHighlighter(html);
```

## Result

```html
<h1 class="headline">Hello world!</h1>
```
