import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { calculate } from "./day02.ts";
import { getLines } from "../shared/file-util.ts";

const TEST_INPUT = [
  "forward 5",
  "down 5",
  "forward 8",
  "up 3",
  "down 8",
  "forward 2",
];

const ACTUAL_INPUT_PATH = "day02.input.txt";
const FILE_INPUT = getLines(ACTUAL_INPUT_PATH, 2021);

Deno.test("2021 > day 2 > part 1 + 2 > example", () => {
  const result = calculate(TEST_INPUT);

  assertEquals(result.regular, 150);
  assertEquals(result.adjusted, 900);
});

Deno.test("2021 > day 2 > part 1 + 2 > actual", () => {
  const result = calculate(FILE_INPUT);

  assertEquals(result.regular, 1_480_518);
  assertEquals(result.adjusted, 1_282_809_906);
});
