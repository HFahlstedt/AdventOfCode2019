const utilities = require('../utilities');
const IntCodeComputer = require('../intcode-computer');

const opcodes = utilities.loadInput('day7/input.txt');

const phaseSettings = utilities.permutateArray([5,6,7,8,9]);
let maxOutput = 0;
let optimalSettings;

for (const ps of phaseSettings) {
    const ampA = new IntCodeComputer();
    ampA.loadProgram(opcodes);
    ampA.inputQueue = [0, ps[0]];
    ampA.haltOnOutput = true;
    ampA.run();
    
    const ampB = new IntCodeComputer();
    ampB.loadProgram(opcodes);
    ampB.inputQueue = [ampA.out, ps[1]];
    ampB.haltOnOutput = true;
    ampB.run();

    const ampC = new IntCodeComputer();
    ampC.loadProgram(opcodes);
    ampC.inputQueue = [ampB.out, ps[2]];
    ampC.haltOnOutput = true;
    ampC.run();

    const ampD = new IntCodeComputer();
    ampD.loadProgram(opcodes);
    ampD.inputQueue = [ampC.out, ps[3]];
    ampD.haltOnOutput = true;
    ampD.run();

    const ampE = new IntCodeComputer();
    ampE.loadProgram(opcodes);
    ampE.inputQueue = [ampD.out, ps[4]];
    ampE.haltOnOutput = true;
    ampE.run();

    while (ampE.executing) {
        ampA.inputQueue = [ampE.out];
        ampA.run();
        ampB.inputQueue = [ampA.out];
        ampB.run();
        ampC.inputQueue = [ampB.out];
        ampC.run();
        ampD.inputQueue = [ampC.out];
        ampD.run();
        ampE.inputQueue = [ampD.out];
        ampE.run()
    }

    if (maxOutput < ampE.out) {
        maxOutput = ampE.out;
        optimalSettings = ps;
    }
}

console.log(maxOutput, optimalSettings);