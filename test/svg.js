var tape = require('tape');
var typeset = require("../lib/main.js").typeset;
tape('basic test: check svg generation', function(t) {
    t.plan(4);
    var options = {math: '\\cos(x)', format:'TeX', svg: true};
    typeset(options, function (result) {
        t.ok(true, 'Callback was invoked');
        t.equal(typeof result.svg, 'string', 'Content was generated')
        t.ok(result.svg.match(/^<svg .*>/i), 'Content is SVG format');
        t.equal(options.svg, true, 'Invariant options');
    });
});
