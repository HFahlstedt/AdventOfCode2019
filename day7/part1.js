const utilities = require('../utilities');
const IntCodeComputer = require('../intcode-computer');

const permutate = (arr, size, n, permutations) => {
    if (size === 1) {
        permutations.push(arr.slice());
    }

    for (let i = 0; i < size; i++) {
        permutate(arr, size-1, n, permutations);

        if (size % 2 === 1) {
            const first = arr[0];
            arr[0] = arr[size-1];
            arr[size-1] = first;
        } else {
            const tmp = arr[i];
            arr[i] = arr[size-1];
            arr[size-1] = tmp;
        }
    }

    return permutations;
}

const permutateArray = arr => permutate(arr, arr.length, arr.length, []);

const opcodes = utilities.loadInput('day7/input.txt');
const cpu = new IntCodeComputer();
const phaseSettings = permutateArray([0,1,2,3,4]);
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
