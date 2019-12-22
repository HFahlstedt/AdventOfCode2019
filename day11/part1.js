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

console.log(positions.length);
