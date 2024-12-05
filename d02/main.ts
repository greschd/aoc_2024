import * as fs from 'fs';

function readInput(): string {
    const filePath = 'input.txt';
    return fs.readFileSync(filePath, 'utf8');
}



function parseInput(input: string): number[][] {
    let reports: number[][] = [];
    for(let line of input.split(/\r?\n/)) {
        if (line) {
            let line_split = line.split(/[\s]+/)
            let levels = line_split.map(Number);
            reports.push(levels);
        }
    }
    return reports
}

function checkReport(report: number[]) {
    let first_diff = report[1] - report[0];
    if(first_diff === 0){
        return false;
    }
    let increasing = first_diff > 0
    for(let i=0; i < report.length - 1; ++i) {
        let curr_diff = report[i+1] - report[i];
        let diff_abs = Math.abs(curr_diff);
        if(diff_abs > 3 || diff_abs === 0) {
            return false;
        }
        if((curr_diff > 0) !== increasing) {
            return false;
        }

    }
    return true;
}

function checkReport2(report: number[]) {
    if(checkReport(report)) {
        return true;
    }
    for(let i=0; i < report.length; ++i) {
        let head = report.slice(0, i);
        let tail = report.slice(i + 1);
        if(checkReport(head.concat(tail))) {
            return true;
        }
    }
    return false;
}

function main() {
    let reports = parseInput(readInput());
    let count = reports.map(checkReport).filter(x => x).length;
    console.log("Part 1:", count);
    let count2 = reports.map(checkReport2).filter(x => x).length;
    console.log("Part 2:", count2);
}
main();
