import * as fs from 'fs';

function readInput(): string {
    const filePath = 'input.txt';
    return fs.readFileSync(filePath, 'utf8');
}


function parseInput(input: string): [number[], number[]] {
    let left_list: number[] = [];
    let right_list: number[] = [];
    for(let line of input.split('\n')) {
        if(line === '') {
            continue;
        }
        let [left, right] = line.split(/[\s]+/).map(Number);
        if (left === undefined || right === undefined) {
            console.error('Invalid input');
        }
        left_list.push(left);
        right_list.push(right);
    }
    return [left_list, right_list];
}

function part1(left_list_sorted: number[], right_list_sorted: number[]) {
    let diff_sum = 0
    for (let i = 0; i < left_list_sorted.length; i++) {
        diff_sum += Math.abs(left_list_sorted[i] - right_list_sorted[i]);
    }
    console.log("Part 1:", diff_sum);
}

function getCounts(list: number[]) {
    let counts: Map<number, number> = new Map();
    for(let item of list) {
        counts.set(item, (counts.get(item) || 0) + 1);
    }
    return counts;
}

function part2(left_list_sorted: number[], right_list_sorted: number[]) {
    let similarity_score = 0
    let left_counts = getCounts(left_list_sorted);
    let right_counts = getCounts(right_list_sorted);
    for(let [key, value] of left_counts) {
        similarity_score += key * value * (right_counts.get(key) || 0);
    }

    console.log("Part 2:", similarity_score);
}

function main() {
    let [left_list, right_list] = parseInput(readInput());
    left_list.sort();
    right_list.sort();

    part1(left_list, right_list);
    part2(left_list, right_list);
}
main();
