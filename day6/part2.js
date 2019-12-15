const utilities = require('../utilities');

const createMap = orbits => {
    let map = {};
    for (const orb of orbits) {
        [A, B] = orb.split(')');
        map[B] = A;
    }

    return map;
}

const pathToCom = (start, map) => {
    let next = map[start];
    let path = [start];

    while (next !== 'COM') {
        path.push(next);
        next = map[next];
    }

    return path;
}

const input = utilities.loadInput('day6/input.txt').split('\n');
const orbits = createMap(input);

const mypath = pathToCom('YOU', orbits);
const santapath = pathToCom('SAN', orbits);

const diff1 = mypath.filter(p => !santapath.includes(p));
const diff2 = santapath.filter(p => !mypath.includes(p));


console.log(diff1.length + diff2.length - 2);