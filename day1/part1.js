const utilities = require('../utilities');
const content = utilities.loadInput('day1/input.txt');

const mass = content.split('\n');

const fuel_req = mass.map(m => Math.floor(m/3)-2);

const sum = fuel_req.reduce((acc, val) => acc + val);
console.log(sum);