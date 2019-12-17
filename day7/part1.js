const utilities = require('../utilities');
const IntCodeComputer = require('../intcode-computer');

const opcodes = utilities.loadInput('day7/input.txt');
const cpu = new IntCodeComputer();
const phaseSettings = utilities.permutateArray([0,1,2,3,4]);
let lastOutput;
let maxOutput = 0;
let optimalSettings;

for (const ps of phaseSettings) {
    lastOutput = 0;
    for (const setting of ps) {
        cpu.loadProgram(opcodes);
        cpu.inputQueue = [lastOutput, setting];
    
        cpu.run(false);
        lastOutput = cpu.out;
    }
    //console.log(lastOutput);
    if (maxOutput < lastOutput) {
        maxOutput = lastOutput;
        optimalSettings = ps.slice();
    }

    maxOutput = Math.max(maxOutput, lastOutput);
}

console.log(maxOutput, optimalSettings);
