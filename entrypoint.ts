import * as Day01 from "./src/2021/day01.ts";
import * as Day02 from "./src/2021/day02.ts";
import * as Day03 from "./src/2021/day03.ts";
import * as Day04 from "./src/2021/day04.ts";

import {
  getLines,
  getLinesAsNumbers,
  getText,
} from "./src/shared/file-util.ts";

const part01 = getLinesAsNumbers("day01.input.txt", 2021);
const part02 = getLines("day02.input.txt", 2021);
const part03 = getLines("day03.input.txt", 2021);
const part04 = getText("day04.input.txt", 2021);

console.log("start");

console.log(`Day 01 > Part 01 > ${Day01.calculateDay01Part01(part01)}`);
console.log(`Day 01 > Part 02 > ${Day01.calculateDay01Part02(part01)}`);

console.log(`Day 02 > Part 01 + 02 > ${Day02.calculateDay02(part02)}`);

console.log(`Day 03 > Part 01 > ${Day03.calculateDay03Part01(part03)}`);
console.log(`Day 03 > Part 02 > ${Day03.calculateDay03Part02(part03)}`);

console.log(`Day 04 > Part 01 + 02 > ${Day04.calculateDay04(part04)}`);

console.log("end");
