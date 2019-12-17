const fs = require('fs');
const path = require('path');


exports.loadInput = fileName => {
    return fs.readFileSync(path.join(__dirname, fileName), 'utf8');
}

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

exports.permutateArray = arr => permutate(arr, arr.length, arr.length, []);
