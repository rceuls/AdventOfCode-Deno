import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { calculateDay04 } from "./day04.ts";
import { getText } from "../shared/file-util.ts";

const ACTUAL_INPUT_PATH = "day04.input.txt";
const TEST_INPUT_PATH = "day04.test.input.txt";

const FILE_INPUT = getText(ACTUAL_INPUT_PATH, 2021);
const TEST_INPUT = getText(TEST_INPUT_PATH, 2021);

Deno.test("2021 > day 4 > part 1 + 2 > example", () => {
  const result = calculateDay04(TEST_INPUT);

  assertEquals(result.first, 4512);
  assertEquals(result.last, 1924);
});

Deno.test("2021 > day 4 > part 1 + 2 > actual", () => {
  const result = calculateDay04(FILE_INPUT);

  assertEquals(result.first, 29440);
  assertEquals(result.last, 13884);
});
