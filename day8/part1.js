const utilities = require('../utilities');


const rawData = utilities.loadInput('day8/input.txt').split('');
const imageSize = 6*25;
let layers = [];
let zeroCount = imageSize;
let prod = 0;

for (index = 0; index < rawData.length; index += imageSize) {
    const layer = rawData.slice(index, index+imageSize);
    const count = layer.reduce((acc, curr) => {acc[curr]++; return acc;}, { '0': 0, '1': 0, '2': 0});
    
    if (zeroCount > count['0']) {
        zeroCount = count['0'];
        prod = count['1'] * count['2'];
    }
    
    layers.push({layer, count});    
}

console.log(prod);