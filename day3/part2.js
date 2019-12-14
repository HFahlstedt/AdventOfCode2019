const utilities = require('../utilities');

const toVector = c => {
    const direction = c[0];
    const count = parseInt(c.substring(1), 10);
    let vec;
    totalDistance += count;

    switch(direction) {
        case 'U':
            vec = {x1: x, y1: y, x2: x, y2: y+count };
            y += count;
            break;
        case 'D':
            vec = {x1: x, y1: y-count, x2: x, y2: y }; 
            y -= count;
            break;
        case 'R':
            vec = {x1: x, y1: y, x2: x+count, y2: y, };
            x += count;
            break;
        case 'L':
            vec = {x1: x-count, y1: y, x2: x, y2: y };
            x -= count;
            break;
    }

    return {...vec, len: totalDistance, direction };
}

const distanceToIntersect = (c, v) => {
    switch (v.direction) {
        case 'U': 
            return v.len - (v.y2 - c[1]);
        case 'D': 
            return v.len - (c[1] - v.y1);
        case 'R': 
            return v.len - (v.x2 - c[0]);
        case 'L': 
            return v.len - (c[0] - v.x1);
    }
};

const intersects = (a, b) => 
    ((a.x1 !== a.x2) && (a.x1 < b.x1 && b.x1 < a.x2) && (b.y1 < a.y1 && a.y1 < b.y2)) ? [b.x1, a.y1, a, b] :  
    ((b.x1 !== b.x2) && (b.x1 < a.x1 && a.x1 < b.x2) && (a.y1 < b.y1 && b.y1 < a.y2)) ? [a.x1, b.y1, a, b] : null; 

const input = utilities.loadInput('day3/input.txt');
const [comms1, comms2] = input.split('\n');

let x = 0;
let y = 0;
let totalDistance = 0;

const vectors1 = comms1.split(',').map(toVector);

x = 0;
y = 0;
totalDistance = 0;

const vectors2 = comms2.split(',').map(toVector);

let intersections = [];

for (const v1 of vectors1) {
    for (const v2 of vectors2) {
        const coord = intersects(v1, v2)
        if (coord) {
            intersections.push([...coord, distanceToIntersect(coord, v1), distanceToIntersect(coord, v2)]);
        }
    }    
}

//console.log('vectors1: ', JSON.stringify(intersections));

const dist = Math.min(...intersections.map(i => Math.abs(i[0]) + Math.abs(i[1])));
const travel = Math.min(...intersections.map(i => i[4] + i[5]));

console.log(travel);
console.log(dist);
