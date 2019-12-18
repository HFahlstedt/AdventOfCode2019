const utilities = require('../utilities');
const IntCodeComputer = require('../intcode-computer');

const opcodes = utilities.loadInput('day9/input.txt');


const cpu = new IntCodeComputer();
cpu.loadProgram(opcodes);
cpu.inputQueue = [2];
cpu.run();