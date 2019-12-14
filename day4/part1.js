const start = 152085;
const end = 670283;

const toDigitArray = n => n.toString().split('').map(i => parseInt(i, 10));

const isAscending = n => {
    const x = toDigitArray(n);

    for (let i = 0; i < x.length-1; i++) {
        if (x[i] > x[i+1]) return false;        
    }

    return true;
};

const hasAdjacentDigits = n => {
    const x = toDigitArray(n);

    for (let i = 0; i < x.length-1; i++) {
        if (x[i] === x[i+1]) return true;        
    }

    return false;
}

let count = 0;

for (let n = start; n <= end; n++) {
    if (isAscending(n) && hasAdjacentDigits(n)) {
        
        count++;
    }
}

console.log(count);
// const findWithAdjacent = n => {
//     let x = toDigitArray(n);

//     for (let i = 0; i < x.length-1; i++) {
//         if (x[i] > x[i+1]) {
//             x[i+1] = x[i];
//             for (let j = i+2; j < x.length; j++) {
//                 x[j] = 0;
//             }
//         }        
//     }

//     return parseInt(x.join(''), 10);
// }

// 155 555 15 + 10 + 6 + 3 + 1 = (1+2+3+4+5)+(1+2+3+4)+(1+2+3)+(1+2)+(1) = 5*1+4*2+3*3+2*4+1*5 = 35
// 555 556 557 558 559
// 566 567 568 569 
// 577 578 579
// 588 589
// 599
// 666 667 668 669
// 677 678 679
// 688 689
// 699
// 777 778 779
// 788 789
// 799
// 888 889
// 899
// 999
//console.log(JSON.stringify(findWithAdjacent(start)));