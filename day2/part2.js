const utilities = require('../utilities');
const IntCodeComputer = require('../intcode-computer');

const content = utilities.loadInput('day2/input.txt');

for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 100; verb++) {
        const cpu = new IntCodeComputer();
        cpu.loadProgram(content);
        cpu.opcodes[1] = noun;
        cpu.opcodes[2] = verb;

        cpu.run();

        if (cpu.opcodes[0] === 19690720) {
            console.log(`${noun * 100 + verb}`);
            break;
        }
    }    
}