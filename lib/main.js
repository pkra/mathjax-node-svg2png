/*************************************************************************
 *
 *  mathjax-node-svg2png
 *
 *  A drop-in replacement for mathjax-node which adds PNG data-uri
 *  using svg2png.
 *
 * ----------------------------------------------------------------------
 *
 *  Copyright (c) 2016 The MathJax Consortium
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

var mathjax = require('mathjax-node');
var svg2png = require('svg2png');

// input `data` extends mathjax-node input `data`.
// Additional values are:
//
// png: true         // enable PNG generation
// scale: 1,         // scaling factor to apply during conversion

// `result` data extends the mathjax-node `result` data.
// Additional values are
//
//  png             // data URI in base64
//  pngWidth        // PNG width (in pixel)
//

const cbTypeset = function(data, callback) {
    var svg = data.svg;
    if (data.png) data.svg = true;
    mathjax.typeset(data, function(result) {
        data.svg = svg;
        if (result.error) callback(result);
        if (data.png) convert(result, data, callback);
        else callback(result, data);
    });
};

// main API, callback and promise compatible
exports.typeset = function (data, callback) {
    if (callback) cbTypeset(data, callback);
    else return new Promise(function (resolve, reject) {
        cbTypeset(data, function (output, input) {
            if (output.errors) reject(output.errors);
            else resolve(output, input);
        });
    });
};


var convert = function(result, data, callback) {
    var sourceBuffer = new Buffer(result.svg, 'utf-8');
    var scale = data.scale || 1;
    // NOTE magic constant, vaguely matches ~16pt Times
    const EXTOPX = data.ex || 6;
    result.pngWidth = result.width.substring(0, result.width.length - 2) * EXTOPX * scale;
    var returnBuffer = svg2png.sync(sourceBuffer, {
        width: result.pngWidth
    });
    result.png = 'data:image/png;base64,' + returnBuffer.toString('base64');
    callback(result);
};


exports.start = mathjax.start;
exports.config = mathjax.config;
