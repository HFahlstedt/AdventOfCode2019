const utilities = require('../utilities');

const content = utilities.loadInput('day2/input.txt');
const txtcodes = content.split(',');
const codes = txtcodes.map(c => parseInt(c, 10));



for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 100; verb++) {
        let tmpCodes = [...codes];
        
        tmpCodes[1] = noun;
        tmpCodes[2] = verb;
        
        let done = false;
        let ip = 0;
        
        
        while (!done) {
            switch (tmpCodes[ip]) {
                case 1:
                    tmpCodes[tmpCodes[ip+3]] = tmpCodes[tmpCodes[ip+1]] + tmpCodes[tmpCodes[ip+2]];
                    break;
                case 2:
                    tmpCodes[tmpCodes[ip+3]] = tmpCodes[tmpCodes[ip+1]] * tmpCodes[tmpCodes[ip+2]];
                    break;
                case 99:
                    done = true;
                    break;
                default:
                    console.log('Error: ' + tmpCodes[ip]);
            }
            ip += 4;
        }
        
        if (tmpCodes[0] === 19690720) {
            console.log(`${noun * 100 + verb}`);    
        }
    }
}
