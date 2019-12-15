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
        this.out = undefined;
    }

    loadProgram(programString) {
        this.reset();
        this.opcodes = programString.split(',').map(o => parseInt(o, 10));
    }

    run(verbose = false) {
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
                    this.out = this.getParameter(this.parameterModes.first);
                    console.log(`Out: ${this.out}`);
                    break;
                case 5:
                    first = this.getParameter(this.parameterModes.first);
                    second = this.getParameter(this.parameterModes.second);

                    if (first !== 0) {
                        this.ip = second;
                    }
                    break;
                case 6:
                    first = this.getParameter(this.parameterModes.first);
                    second = this.getParameter(this.parameterModes.second);

                    if (first === 0) {
                        this.ip = second;
                    }
                    break;
                case 7:
                    first = this.getParameter(this.parameterModes.first);
                    second = this.getParameter(this.parameterModes.second);
                    this.setOpcode(this.readOpcode(), first < second ? 1 : 0);
                    break;
                case 8:
                    first = this.getParameter(this.parameterModes.first);
                    second = this.getParameter(this.parameterModes.second);
                    this.setOpcode(this.readOpcode(), first === second ? 1 : 0);
                    break;
                case 99:
                    done = true;
                    break;
                    default:
                    break;
            }

            if (verbose) {
                console.log(this.opcodes.join(','));
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

    reset() {
        this.opcodes = [];
        this.inputQueue = [];
        this.ip = 0;
        this.parameterModes = { first: 0, second: 0, third: 0 };
        this.instruction = 0;
        this.out = undefined;
    }
}