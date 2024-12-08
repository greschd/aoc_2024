import * as fs from 'fs';

const targetRegex = /XMAS/g;

function getCharArray(input: string) {
    let res = [];
    for (let line of input.split('\n')) {
        if (line !== '') {
            res.push(line.split(''));
        }
    }
    return res;
}

function countInLine(line: string) {
    return (line.match(targetRegex) || []).length;
}

function countInLineWithReverse(line: string) {
    return countInLine(line) + countInLine(line.split('').reverse().join(''));
}

function part1(input: string) {
    const char_array = getCharArray(input);
    let count = 0;
    for (let line of char_array) {
        count += countInLineWithReverse(line.join(''));

    }
    for (let i = 0; i < char_array[0].length; i++) {
        let column = char_array.map(row => row[i]);
        count += countInLineWithReverse(column.join(''));
    }

    const numRows = char_array.length;
    const numCols = char_array[0].length;
    // Get all diagonals from top-left to bottom-right
    for (let d = -numCols + 1; d < numRows; d++) {
        let diagonal = [];
        for (let i = d; i < numRows; i++) {
            let j = i - d;
            if (i >= 0 && j >= 0 && i < numRows && j < numCols) {
                diagonal.push(char_array[i][j]);
            }
        }
        count += countInLineWithReverse(diagonal.join(''));
    }
    // Get all diagonals from top-right to bottom-left
    for (let d = 0; d < numCols + numRows - 1; d++) {
        let diagonal = [];
        for (let i = 0; i <= d; i++) {
            let j = d - i;
            if (i >= 0 && j >= 0 && i < numRows && j < numCols) {
                diagonal.push(char_array[i][j]);
            }
        }
        count += countInLineWithReverse(diagonal.join(''));
    }
    console.log(count);
}

function countXMas(array: string[][]) {
    let count = 0;
    const numRows = array.length;
    const numCols = array[0].length;
    for (let i = 0; i < numRows - 2; i++) {
        for (let j = 0; j < numCols - 2; j++) {
            if (array[i][j] === 'M' && array[i + 2][j] === 'M' && array[i + 1][j + 1] === 'A' && array[i][j + 2] === 'S' && array[i + 2][j + 2] === 'S') {
                count++;
            }
        }
    }
    return count;
}

function part2(input: string) {
    const char_array = getCharArray(input);
    let count = 0;
    count += countXMas(char_array);
    let char_array_rotated = char_array[0].map((_, colIndex) => char_array.map(row => row[colIndex]));
    count += countXMas(char_array_rotated);
    let char_array_reversed = char_array.map(row => row.reverse());
    count += countXMas(char_array_reversed);
    let char_array_rotated_reversed = char_array_rotated.map(row => row.reverse());
    count += countXMas(char_array_rotated_reversed);
    console.log(count);
}


function main(filePath: string) {
    part1(fs.readFileSync(filePath, 'utf-8'));
    part2(fs.readFileSync(filePath, 'utf-8'));
}
console.log('Test input: ');
main('input_test.txt');
console.log('Puzzle input: ');
main('input.txt');
