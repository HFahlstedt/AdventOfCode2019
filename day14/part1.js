const utilities = require('../utilities');

const recieps = utilities.loadInput('day14/input.txt').split('\n').map(x => x.split(' => '));

// const toCountAndVal = s => { 
//     const tmp = s.split(' ');
//     return { count: parseInt(tmp[0]), val: tmp[1] };
// }; 

// const recieps = rawData.map(r => {
//     const fromTo = r.split(' => ');
//     return { from: fromTo[0].split(', ').map(toCountAndVal), to: toCountAndVal(fromTo[1]) };
// });

//console.log(JSON.stringify(recieps));
// const found = recieps.find(x => x[1].match(/\d+ WHMLV/));

// console.log(JSON.stringify(found));

// 7 LCSV, 1 LKPNB, 36 CMNH, 1 JZXPH, 20 DGJPN, 3 WDWB, 69 DXJKC, 3 WHJKH, 18 XSGP, 22 CGZL, 2 BNVB, 57 PNSD => 1 FUEL
// 7 (1 (1 KPFLZ, 1 XVXCZ), 3 BDSB, 2 JVGD), 1 LKPNB, 36 CMNH, 1 JZXPH, 20 DGJPN, 3 WDWB, 69 DXJKC, 3 WHJKH, 18 XSGP, 22 CGZL, 2 BNVB, 57 PNSD => 1 FUEL



// const listToOreCount = (list, multiplier) => {
//     switch (true) {
//         case list.count === 1 && list[0].from.val === 'ORE': 
//             return multiplier * list
//     }
// }


// Too high: 213485325
// Too high: 169721
const calcIngredientCost = (ingredient, count, subMap, surplus) => {
    //console.log(ingredient, count);
    const regex = new RegExp(`\\d+ ${ingredient}`)
    const found = recieps.find(x => x[1].match(regex));    
    const yieldCount = parseInt(found[1].split(', ')[0]);
    const multiplier = Math.ceil(count/yieldCount);
    const surplusCount = multiplier*yieldCount;

    const subIngredients = found[0].split(', ').map(x => { const [c, y] = x.split(' '); return [y, multiplier*c];});
    //console.log(JSON.stringify(subIngredients));

    for (const s of subIngredients) {
        if (subMap[s[0]]) {
            subMap[s[0]] += s[1];
        } else {
            subMap[s[0]] = s[1];
        }
    }

    //console.log(JSON.stringify(subMap));
    return [subMap, surplusCount];
} 


let [count, _] = calcIngredientCost('FUEL', 1, {});

const onlyOre = x => {
    for (const key in x) {
        if (x.hasOwnProperty(key)) {
            if (key !== 'ORE' && x[key] > 0) return false;                        
        }
    }

    return true;
}

while (!onlyOre(count)) {
    let tmpCount = {...count};
    for (const key in count) {
        if (count.hasOwnProperty(key) && key !== 'ORE') {
            [tmpCount, surplusCount] = calcIngredientCost(key, tmpCount[key], tmpCount);
            tmpCount[key] -= surplusCount;
            if (tmpCount[key] === 0) {
                delete tmpCount[key];
            }
            console.log(JSON.stringify(tmpCount));
        }
    }
    count = tmpCount;
}


console.log(count['ORE']);
//console.log(Object.keys(count).length);