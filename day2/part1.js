const utilities = require('../utilities');

const content = utilities.loadInput('day2/input.txt');
const txtcodes = content.split(',');
const codes = txtcodes.map(c => parseInt(c, 10));

codes[1] = 12;
codes[2] = 2;

let done = false;
let ip = 0;


while (!done) {
    switch (codes[ip]) {
        case 1:
            codes[codes[ip+3]] = codes[codes[ip+1]] + codes[codes[ip+2]];
            break;
        case 2:
            codes[codes[ip+3]] = codes[codes[ip+1]] * codes[codes[ip+2]];
            break;
        case 99:
            done = true;
            break;
        default:
            console.log('Error: ' + codes[ip]);
    }
    ip += 4;
}

console.log(codes[0]);