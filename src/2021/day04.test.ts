import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { calculate, calculateTwo } from "./day04.ts";
import { getText } from "../shared/file-util.ts";

const ACTUAL_INPUT_PATH = "day04.input.txt";
const TEST_INPUT_PATH = "day04.test.input.txt";

const FILE_INPUT = getText(ACTUAL_INPUT_PATH, 2021);
const TEST_INPUT = getText(TEST_INPUT_PATH, 2021);

Deno.test("2021 > day 4 > part 1 > example", () => {
  const result = calculate(TEST_INPUT);

  assertEquals(result, 4512);
});

Deno.test("2021 > day 4 > part 1 > actual", () => {
  const result = calculate(FILE_INPUT);

  assertEquals(result, 29440);
});

Deno.test("2021 > day 4 > part 2 > example", () => {
  const result = calculateTwo(TEST_INPUT);

  assertEquals(result, 1924);
});

Deno.test("2021 > day 4 > part 2 > actual", () => {
  const result = calculateTwo(FILE_INPUT);

  assertEquals(result, 13884);
});
