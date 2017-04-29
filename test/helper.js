// Helpers (for debugging)

var fs = require("fs");
// writePNG
// USE: require('./helper.js').writePNG(result.png.data,'out.png');
exports.writePNG = function (string, filename) {
    var raw = string.substring(22);
    fs.writeFile(filename, raw, 'base64', function(err) {
    if (err) console.log('Error writing to disk' + err);
    });
}