const utilities = require('../utilities');
const IntCodeComputer = require('../intcode-computer');

const opcodes = utilities.loadInput('day5/input.txt');

const cpu = new IntCodeComputer();
cpu.loadProgram(opcodes);
cpu.inputQueue.push(1);

cpu.run();
