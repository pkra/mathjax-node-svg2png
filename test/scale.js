var tape = require('tape');
var typeset = require("../lib/main.js").typeset;
tape('scaling: basic check', function(t) {
    t.plan(1);
    var opt1 = {math: '\\sin(x)', format:'TeX', png:true};
    var opt2 = {math: '\\sin(x)', format:'TeX', png:true, scale: 3};
    var result1 = 0;
    var result2 = 0;
    typeset(opt1, function (result) {
        result1 = result.pngWidth;
    });
    typeset(opt2, function (result) {
        result2 = result.pngWidth;
        t.equal(result1*3, result2, 'Scale applied')
    });
});
