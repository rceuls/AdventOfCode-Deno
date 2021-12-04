import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { calculateDay01Part01, calculateDay01Part02 } from "./day01.ts";
import { getLinesAsNumbers } from "../shared/file-util.ts";

const TEST_INPUT = [
  "199",
  "200",
  "208",
  "210",
  "200",
  "207",
  "240",
  "269",
  "260",
  "263",
].map((x) => +x);

const ACTUAL_INPUT_PATH = "day01.input.txt";
const FILE_INPUT = getLinesAsNumbers(ACTUAL_INPUT_PATH, 2021);

Deno.test("2021 > day 1 > part 1 > example", () => {
  assertEquals(calculateDay01Part01(TEST_INPUT), 7);
});

Deno.test("2021 > day 1 > part 2 > example", () => {
  assertEquals(calculateDay01Part02(TEST_INPUT), 5);
});

Deno.test("2021 > day 1 > part 1 > actual", () => {
  assertEquals(calculateDay01Part01(FILE_INPUT), 1564);
});

Deno.test("2021 > day 1 > part 2 > actual", () => {
  assertEquals(calculateDay01Part02(FILE_INPUT), 1611);
});
