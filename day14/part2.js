const utilities = require('../utilities');

const safeAdd = (obj, key, value) => {
    if (obj[key]) {
        obj[key] += value;
    } else {
        obj[key] = value;
    }
}

const recieps = utilities.loadInput('day14/input.txt').split('\n').map(x => x.split(' => '));

const findReciep = (product) => {
    const regex = new RegExp(`\\d ${product}`);
    return recieps.find(x => x[1].match(regex));
}

const calculateCost = (left, right) => {
    let leftHand = left.split(', ').reduce((acc, curr) => { [v, k] = curr.split(' '); acc[k] = parseInt(v, 10); return acc; }, {});
    let rightHand = right ? right.split(', ').reduce((acc, curr) => { [v, k] = curr.split(' '); acc[k] = parseInt(v, 10); return acc; }, {}) : {};
    
    while (Object.entries(leftHand).length > 1) {
        const keys = Object.keys(leftHand);
    
        for (const key of keys) {
            if (key !== 'ORE') {
                const neededCount = parseInt(leftHand[key], 10);
                const [left, right] = findReciep(key);
                const yeildCount = parseInt(right.split(' ')[0], 10);
                const multiplier = Math.ceil(neededCount/yeildCount);
    
                const subIngredients = left.split(', ').map(ingredient => { 
                    const [c, n] = ingredient.split(' '); 
                    let adjust = 0;
                    if (rightHand[n]) {
                        adjust = rightHand[n];
                        delete rightHand[n];
                    }
        
                    return [n, multiplier*c-adjust];
                });
            
                for (const [sName, sCount] of subIngredients) {
                    safeAdd(leftHand, sName, sCount);
                }
            
                const surplusCount = yeildCount*multiplier-neededCount;
    
                if (surplusCount > 0) {
                    safeAdd(rightHand, key, surplusCount);
                }
    
                delete leftHand[key];
            }
        }
    }

    return { leftHand, rightHand };
}

const trillion = 1000000000000;
const [left, right] = findReciep('FUEL');
const cost = calculateCost(left, right);
const oreCost = cost.leftHand['ORE'];


const fuelFromStart = Math.floor(trillion/oreCost);
let restProducts = {...cost.rightHand};
delete restProducts['FUEL'];
let totalFuel = fuelFromStart;
let restOre = trillion % oreCost;
let restString = Object.entries(restProducts).map(([k, v], i) => `${v*fuelFromStart} ${k}`).join(', ');
let newFuel = fuelFromStart;

while (newFuel > 0) {
    costRest = calculateCost(restString, '');
    
    restOre += costRest.leftHand['ORE'];
    newFuel = Math.floor(restOre/oreCost);
    totalFuel += newFuel;
    restOre = restOre % oreCost;
    const newRest = {...costRest.rightHand};
    for (const key in restProducts) {
        if (restProducts.hasOwnProperty(key)) {
            safeAdd(newRest, key, restProducts[key]*newFuel);            
        }
    }
    restString = Object.entries(newRest).map(([k, v], i) => `${v} ${k}`).join(', ');
} 

console.log(totalFuel);
//TOO HIGH: 7993836
//TOO HIGH: 7993835