const utilities = require('../utilities');
const IntCodeComputer = require('../intcode-computer');

const content = utilities.loadInput('day2/input.txt');

const cpu = new IntCodeComputer();

cpu.loadProgram(content);
cpu.opcodes[1] = 12;
cpu.opcodes[2] = 2;

cpu.run();

console.log(cpu.opcodes[0]);
