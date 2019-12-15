const utilities = require('../utilities');
const IntCodeComputer = require('../intcode-computer');

const opcodes = '3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0';//utilities.loadInput('day7/input.txt');

const cpu = new IntCodeComputer();


const phaseSettings = [[0,1,2,3,4], [4,3,2,1,0]];
let lastOutput;

for (const ps of phaseSettings) {
    lastOutput = 0;
    for (const setting of ps) {
        cpu.loadProgram(opcodes);
        cpu.inputQueue = [setting, lastOutput];
    
        cpu.run(true);
        lastOutput = cpu.out;
    }
    console.log(lastOutput);
}

