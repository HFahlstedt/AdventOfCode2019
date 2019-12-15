class Instruction {
    constructor(size, fn) {
        this.size = size;
        this.fn = fn;
    }
}

module.exports = class IntCodeComputer {
    constructor() {
        this.opcodes = [];
        this.inputQueue = [];
        this.ip = 0;
        this.parameterModes = { first: 0, second: 0, third: 0 };
        this.instruction = 0;
    }

    loadProgram(programString) {
        this.opcodes = programString.split(',').map(o => parseInt(o, 10));
    }

    run() {
        let done = false;

        while (!done) {
            this.readInstruction();
            let first, second;

            switch (this.instruction) {
                case 1:
                    first = this.getParameter(this.parameterModes.first);
                    second = this.getParameter(this.parameterModes.second);

                    this.setOpcode(this.readOpcode(), first + second);
                    break;            
                case 2:
                    first = this.getParameter(this.parameterModes.first);
                    second = this.getParameter(this.parameterModes.second);

                    this.setOpcode(this.readOpcode(), first * second);
                    break;
                case 3: 
                    this.setOpcode(this.readOpcode(), this.readInput());
                    break;
                case 4:
                    console.log(`Out: ${this.getParameter(this.parameterModes.first)}`);
                    break;
                case 99:
                    done = true;
                    break;
                    default:
                    break;
            }
        }
    }

    readInstruction() {
        const opcode = this.readOpcode();
        this.instruction = opcode % 100;
        this.parameterModes = { 
            first: Math.floor((opcode % 1000)/100), 
            second: Math.floor((opcode % 10000)/1000), 
            third: Math.floor(opcode/10000) 
        };
    }

    getParameter(mode) {
        const opcode = this.readOpcode();
        
        return mode === 1 ? opcode : this.opcodes[opcode];
    }

    setOpcode(address, value) {
        this.opcodes[address] = value;
    }

    readOpcode = () => this.opcodes[this.ip++];

    readInput() {
        return this.inputQueue.pop();
    }
}