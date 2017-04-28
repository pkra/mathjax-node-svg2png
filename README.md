# mathjax-node-svg2png [![Build Status](https://travis-ci.org/pkra/mathjax-node-svg2png.svg?branch=master)](https://travis-ci.org/pkra/mathjax-node-svg2png)

This module extends [mathjax-node](https://www.npmjs.com/package/mathjax-node) using [svg2png](https://www.npmjs.com/package/svg2png).

It can be used as a drop-in replacement for mathjax-node.

Use

    npm install mathjax-node-svg2png

to install mathjax-node-svg2png and its dependencies.

## Use

This module is used like mathjax-node, extending the input `data` object with new options

   png: false              // enable PNG generation
   scale: 1                // scaling factor to apply during conversion

Similarly, mathjax-node's `result` object is extended with new keys `png` (containing the resulting data-uri string) and `pngWidth` (PNG width in pixel).

    png:                   // PNG results
    pngWidth:              // width (in pixel)
