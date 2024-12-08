import * as fs from 'fs';

function part1(input: string) {
    let result = 0;
    const regex = /mul\(([\d]+),([\d]+)\)/g;
    const matches = input.matchAll(regex);

    for (const match of matches) {
        const a = parseInt(match[1]);
        const b = parseInt(match[2]);
        result += a * b;
    }
    console.log("Part 1:", result);
}

function part2(input: string) {
    let result = 0;
    const regex = /mul\(([\d]+),([\d]+)\)|do\(\)|don\'t\(\)/g;
    const matches = input.matchAll(regex);
    let enabled = true;

    for (const match of matches) {
        if (match[0] === 'do()') {
            enabled = true;
        } else if (match[0] === 'don\'t()') {
            enabled = false;
        } else if (enabled) {
            const a = parseInt(match[1]);
            const b = parseInt(match[2]);
            result += a * b;
        }
    }
    console.log("Part 2:", result);
}

function main(filePath: string) {
    part1(fs.readFileSync(filePath, 'utf-8'));
    part2(fs.readFileSync(filePath, 'utf-8'));
}
console.log('Test input: ');
main('input_test.txt');
console.log('Puzzle input: ');
main('input.txt');
