const utilities = require('../utilities');
const IntCodeComputer = require('../intcode-computer');

const opcodes = utilities.loadInput('day11/input.txt');

const cpu = new IntCodeComputer();
cpu.loadProgram(opcodes);
cpu.haltOnOutput = true;

let pos = {x: 0, y: 0};
let dir = 0;
let next_color;
let positions = [];

cpu.inputQueue = [1];
cpu.run();
next_color = cpu.out;
positions.push({...pos, col: next_color});
cpu.run();
dir = (cpu.out === 0 ? (dir + 3) : dir + 1) % 4;

pos = {
    x: dir === 1 ? pos.x + 1 : (dir === 3 ? pos.x - 1 : pos.x),
    y: dir === 0 ? pos.y + 1 : (dir === 2 ? pos.y - 1 : pos.y)  
}

while (cpu.executing) {
    const p = positions.find(pp => pp.x === pos.x && pp.y === pos.y);

    cpu.inputQueue = [p ? p.col : 0];
    cpu.run();
    next_color = cpu.out;

    if (p) {
        p.col = next_color;
    } else {
        positions.push({...pos, col: next_color});
    }

    cpu.run();
    dir = (cpu.out === 0 ? (dir + 3) : dir + 1) % 4;

    pos = {
        x: dir === 1 ? pos.x + 1 : (dir === 3 ? pos.x - 1 : pos.x),
        y: dir === 0 ? pos.y + 1 : (dir === 2 ? pos.y - 1 : pos.y)  
    }
}

positions.sort((p1, p2) => p1.y !== p2.y ? p2.y-p1.y : p1.x-p2.x);

console.log(positions);

let y = positions[0].y;
let image = [];
let row = '';
for (let index = 0; index < positions.length; index++) {
    const pp = positions[index];
    if (pp.y !== y) {
        image.push(row);
        row = [];
        y = pp.y;
    }

    row += pp.col === 0 ? '#' : '.';
}

for (const r of image) {
    console.log(r);
}
