const utilities = require('../utilities');

const safeAdd = (obj, key, value) => {
    if (obj[key]) {
        obj[key] += value;
    } else {
        obj[key] = value;
    }
}

const recieps = utilities.loadInput('day14/input.txt').split('\n').map(x => x.split(' => '));

const calculateCost = () => {
    const [left, right] = recieps.find(x => x[1].match(/1 FUEL/));

    let leftHand = left.split(', ').reduce((acc, curr) => { [v, k] = curr.split(' '); acc[k] = parseInt(v, 10); return acc; }, {});
    let rightHand = right.split(', ').reduce((acc, curr) => { [v, k] = curr.split(' '); acc[k] = parseInt(v, 10); return acc; }, {});
    
    while (Object.entries(leftHand).length > 1) {
        const keys = Object.keys(leftHand);
    
        for (const key of keys) {
            if (key !== 'ORE') {
                const regex = new RegExp(`\\d ${key}`);
                const neededCount = parseInt(leftHand[key], 10);
                const [left, right] = recieps.find(x => x[1].match(regex));
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

const cost = calculateCost();
console.log(cost.leftHand['ORE']);
