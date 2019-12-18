const utilities = require('../utilities');


const rawData = utilities.loadInput('day8/input.txt').split('');
const imageSize = 6*25;
let finalImage = rawData.slice(0, imageSize).fill('2');

for (index = 0; index < rawData.length; index += imageSize) {
    const layer = rawData.slice(index, index+imageSize);

    for (let i = 0; i < layer.length; i++) {
        if (layer[i] !== '2' && finalImage[i] === '2') {
            finalImage[i] = layer[i] === '0' ? ' ' : '*'; 
        }        
    }
}

for (let row = 0; row < 6; row++) {
    console.log(finalImage.slice(row*25, (row+1)*25).join(''));
}