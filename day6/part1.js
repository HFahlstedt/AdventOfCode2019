const utilities = require('../utilities');

const createMap = orbits => {
    let map = {};
    for (const orb of orbits) {
        [A, B] = orb.split(')');
        map[B] = A;
    }

    return map;
}

const countHops = (map, name) => {
    let next = map[name];
    let hops = 1;

    while (next !== 'COM') {
        next = map[next];
        hops++;
    }

    return hops;
}

const input = utilities.loadInput('day6/input.txt').split('\n');

const orbits = createMap(input);

let total = 0;
for (const key of Object.keys(orbits)) {
    total += countHops(orbits, key);
}

console.log(total);