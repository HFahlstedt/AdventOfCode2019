const utilities = require('../utilities');
const content = utilities.loadInput('day1/input.txt');

const mass = content.split('\n');

const fuel_req = mass.map(m => calc_fuel_req(parseInt(m, 10)));
const sum = fuel_req.reduce((acc, val) => acc + val);
console.log(sum);

function calc_fuel_req(mass) {
    const fr = Math.floor(mass/3) - 2;
    
    if (fr < 0) return 0;
    
    return fr + calc_fuel_req(fr); 
}