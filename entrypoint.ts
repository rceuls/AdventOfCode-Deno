import * as Day01 from "./src/2021/day01.ts";
import * as Day02 from "./src/2021/day02.ts";
import * as Day03 from "./src/2021/day03.ts";
import { getLines, getLinesAsNumbers } from "./src/shared/file-util.ts";

console.log("start");

console.log(
  `Se01e01p01 - ${Day01.calculatePartOne(
    getLinesAsNumbers("day01.input.txt", 2021)
  )}`
);
console.log(
  `Se01e01p02 - ${Day01.calculatePartTwo(
    getLinesAsNumbers("day01.input.txt", 2021)
  )}`
);

console.log(
  `Se01e02 - ${JSON.stringify(
    Day02.calculate(getLines("day02.input.txt", 2021))
  )}`
);

console.log(
  `Se01e03p01 - ${Day03.calculateTwo(getLines("day03.input.txt", 2021))}`
);
console.log(
  `Se01e03p02 - ${Day03.calculate(getLines("day03.input.txt", 2021))}`
);
