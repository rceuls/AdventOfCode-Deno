import * as Day01 from "./src/2021/day01.ts";
import * as Day02 from "./src/2021/day02.ts";
import * as Day03 from "./src/2021/day03.ts";
import { getLines, getLinesAsNumbers } from "./src/shared/file-util.ts";

const part01 = getLinesAsNumbers("day01.input.txt", 2021);
const part02 = getLines("day02.input.txt", 2021);
const part03 = getLines("day03.input.txt", 2021);
console.log("start");

console.log(`Day 01 > Part 01 > ${Day01.calculatePartOne(part01)}`);
console.log(`Day 01 > Part 02 > ${Day01.calculatePartTwo(part01)}`);

console.log(
  `Day 02 > Part 01 + 02 > ${JSON.stringify(Day02.calculate(part02))}`
);

console.log(`Day 03 > Part 01 > ${Day03.calculate(part03)}`);
console.log(`Day 03 > Part 02 > ${Day03.calculateTwo(part03)}`);

console.log("end");
