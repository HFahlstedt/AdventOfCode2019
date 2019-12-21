const utilities = require('../utilities');

const removeFactors = (x, y) => {
    const min = Math.min(Math.abs(x),Math.abs(y));
    let factor = 1;
    for (let d = 2; d <= min; d++) {
        while ((x/factor) % d === 0 && (y/factor) % d === 0) 
        {
            factor *= d;
        }
    }

    return [x/factor, y/factor];
}

const canSee = (a1, a2) => {
    const [a_start, a_stop] = (a1.x < a2.x) ? [a1, a2] : [a2, a1];
    const [step_x, step_y] = 
        (a1.x === a2.x) ? 
            [0, a1.y < a2.y ? -1 : 1] : 
            (a1.y === a2.y ? 
                [1, 0] : 
                removeFactors(a_stop.x - a_start.x, a_stop.y - a_start.y));

    for (curr_x = a_start.x + step_x, curr_y = a_start.y + step_y; curr_x !== a_stop.x || curr_y !== a_stop.y; curr_x += step_x, curr_y += step_y) {
        if (asteroids.some(({x, y}) => curr_x === x && curr_y === y)) {
            return false;
        }
    }

    return true;
}

const map = utilities.loadInput('day10/input.txt').split('\n');

let asteroids = [];

for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
        if (map[y][x] === '#') {
            asteroids.push({x, y});
        }
    }    
}
//console.log(canSee({x: 5, y: 8}, {x: 5, y: 1}));
let maxCount = 0;
let pos = undefined;

for (let index = 0; index < asteroids.length; index++) {
    let count = 0;
    //console.log(`${JSON.stringify(asteroids[index])}: `);

    for (const a of asteroids) {
        if ((a.x !== asteroids[index].x || a.y !== asteroids[index].y) && canSee(asteroids[index], a)) {
            //console.log(`\t${JSON.stringify(a)}`);
            count++;
        }    
    }
    
    if (count > maxCount) {
        maxCount = count;
        pos = asteroids[index];
    }
    maxCount = Math.max(maxCount, count);
}

console.log(maxCount, pos);