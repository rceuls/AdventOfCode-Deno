import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { calculate, calculateTwo } from "./day03.ts";
import { getLines } from "../shared/file-util.ts";

const TEST_INPUT = [
  "00100",
  "11110",
  "10110",
  "10111",
  "10101",
  "01111",
  "00111",
  "11100",
  "10000",
  "11001",
  "00010",
  "01010",
];

const ACTUAL_INPUT_PATH = "day03.input.txt";
const FILE_INPUT = getLines(ACTUAL_INPUT_PATH, 2021);

Deno.test("2021 > day 3 > part 1 > example", () => {
  const result = calculate(TEST_INPUT);

  assertEquals(result, 198);
});

Deno.test("2021 > day 3 > part 1 > actual", () => {
  const result = calculate(FILE_INPUT);

  assertEquals(result, 4006064);
});

Deno.test("2021 > day 3 > part 2 > example", () => {
  const result = calculateTwo(TEST_INPUT);

  assertEquals(result, 230);
});

Deno.test("2021 > day 3 > part 2 > actual", () => {
  const result = calculateTwo(FILE_INPUT);

  assertEquals(result, 5941884);
});
