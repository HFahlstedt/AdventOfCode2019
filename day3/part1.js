const fs = require('fs');
const path = require('path');

const toVector = c => {
    const direction = c[0];
    const count = parseInt(c.substring(1), 10);
    let vec;

    totalDistance += count;
// U: y1---cy---y2 => len - abs(y2-cy)
// D: y2---cy---y1 => len - abs(y1-cy)
// R: x1---cx---x2 => len - abs(x2-cx)
// L: x2---cx---x1 => len - abs(x1-cx)

    switch(direction) {
        case 'U':
            vec = {x1: x, y1: y, x2: x, y2: y+count, dist: (cx, cy) =>  totalDistance - Math.abs(y+count-cy) };
            y += count;
            break;
        case 'D':
            vec = {x1: x, y1: y-count, x2: x, y2: y, dist: (cx, cy) =>  totalDistance - Math.abs(y-count-cy) };
            y -= count;
            break;
        case 'R':
            vec = {x1: x, y1: y, x2: x+count, y2: y, dist: (cx, cy) =>  totalDistance - Math.abs(x+count-cx) };
            x += count;
            break;
        case 'L':
            vec = {x1: x-count, y1: y, x2: x, y2: y, dist: (cx, cy) =>  totalDistance - Math.abs(x-count-cx) };
            x -= count;
            break;
    }

    return vec;
}

const intersects = (a, b) =>
    ((a.x1 !== a.x2) && (a.x1 < b.x1 && b.x1 < a.x2) && (b.y1 < a.y1 && a.y1 < b.y2)) ? { x: b.x1, y: a.y1 } : 
    ((b.x1 !== b.x2) && (b.x1 < a.x1 && a.x1 < b.x2) && (a.y1 < b.y1 && b.y1 < a.y2)) ? { x: a.x1, y: b.y1 } : null;

var input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');

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
            intersections.push({ ...coord, travel: v1.dist(coord.x, coord.y) + v2.dist(coord.x, coord.y) });
        }
    }
}

//console.log('vectors1: ', JSON.stringify(intersections));

const dist = Math.min(...intersections.map(i => Math.abs(i.x) + Math.abs(i.y)));
const travel = Math.min(...intersections.map(i => i.travel));
console.log(dist);
console.log(travel);
