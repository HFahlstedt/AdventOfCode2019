const utilities = require('../utilities');

const map = utilities.loadInput('day10/input.txt').split('\n');
const laserAt = {x: 23, y: 29};

let asteroids = [];

const getPos = ({x, y}) => {
    switch (true) {
        case x === laserAt.x && y < laserAt.y:
            return 'U';
        case x > laserAt.x && y < laserAt.y:
            return 'Q1';
        case x > laserAt.x && y === laserAt.y:
            return 'R';
        case x > laserAt.x && y > laserAt.y:
            return 'Q2';
        case x === laserAt.x && y > laserAt.y:
            return 'D';
        case x < laserAt.x && y > laserAt.y:
            return 'Q3';
        case x < laserAt.x && y === laserAt.y:
            return 'L';
        case x < laserAt.x && y < laserAt.y:
            return 'Q4';
    }
};

for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
        if (map[y][x] === '#' && (laserAt.x !== x || laserAt.y !== y)) {
            asteroids.push({x, y, pos: getPos({x, y})});
        }
    }    
}

const up = asteroids
    .filter(a => a.pos === 'U')
    .sort((a1, a2) => a2.y - a1.y);
let q1 = asteroids
    .filter(a => a.pos === 'Q1')
    .map(a => ({...a, t: (a.x-laserAt.x)/(laserAt.y-a.y)}))
    .sort((a1, a2) => a1.t !== a2.t ? a1.t-a2.t : (a2.x+a2.y)-(a1.x+a1.y));
const right = asteroids
    .filter(a => a.pos === 'R')
    .sort((a1, a2) => a1.x-a2.x);
let q2 = asteroids
    .filter(a => a.pos === 'Q2')
    .map(a => ({...a, t: (a.x-laserAt.x)/(laserAt.y-a.y)}))
    .sort((a1, a2) => a1.t !== a2.t ? a1.t-a2.t : (a1.x+a1.y)-(a2.x+a2.y));
const down = asteroids
    .filter(a => a.pos === 'D')
    .sort((a1, a2) => a1.y - a2.y);
let q3 = asteroids
    .filter(a => a.pos === 'Q3')
    .map(a => ({...a, t: (a.x-laserAt.x)/(laserAt.y-a.y)}))
    .sort((a1, a2) => a1.t !== a2.t ? a1.t-a2.t : (a2.x+a2.y)-(a1.x+a1.y));
const left = asteroids
    .filter(a => a.pos === 'L')
    .sort((a1, a2) => a2.x-a1.x);
let q4 = asteroids
    .filter(a => a.pos === 'Q4')
    .map(a => ({...a, t: (a.x-laserAt.x)/(laserAt.y-a.y)}))
    .sort((a1, a2) => a1.t !== a2.t ? a1.t-a2.t : (a2.x+a2.y)-(a1.x+a1.y));

let count = 0;
let pos = undefined;
let last_t;
let keep;

while (count < 200) {
    if (up.length) {
        pos = up.shift();
        count++;
        console.log(count, pos);
    }
    last_t = undefined;
    keep = [];
    for (let i = 0; i < q1.length; i++) {
        pos = q1[i];
        if (last_t === pos.t) {
            keep.push(pos);
        } else {
            count++;
            console.log(count, pos);
            last_t = pos.t;
        }
    }
    q1 = keep.slice();

    if (right.length) {
        pos = right.shift();
        count++;
        console.log(count, pos);
    }
    last_t = undefined;
    keep = [];
    for (let i = 0; i < q2.length; i++) {
        pos = q2[i];
        if (last_t === pos.t) {
            keep.push(pos);
        } else {
            count++;
            console.log(count, pos);
            last_t = pos.t;
        }
    }
    q2 = keep.slice();
    if (down.length) {
        pos = down.shift();
        count++;
        console.log(count, pos);
    }
    last_t = undefined;
    keep = [];
    for (let i = 0; i < q3.length; i++) {
        pos = q3[i];
        if (last_t === pos.t) {
            keep.push(pos);
        } else {
            count++;
            console.log(count, pos);
            last_t = pos.t;
        }
    }
    q3 = keep.slice();
    if (left.length) {
        pos = left.shift();
        count++;
        console.log(count, pos);
    }
    last_t = undefined;
    keep = [];
    for (let i = 0; i < q4.length; i++) {
        pos = q4[i];
        if (last_t === pos.t) {
            keep.push(pos);
        } else {
            count++;
            console.log(count, pos);
            last_t = pos.t;
        }
    }
    q4 = keep.slice();
}