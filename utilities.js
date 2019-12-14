const fs = require('fs');
const path = require('path');


exports.loadInput = fileName => {
    return fs.readFileSync(path.join(__dirname, fileName), 'utf8');
}