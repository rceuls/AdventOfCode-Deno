import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { calculatePartOne, calculatePartTwo } from "./day01.ts";
import { getLinesAsNumbers } from "./shared/fileUtil.ts";

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
const ACTUAL_INPUT_PATH = "./resources/day01.input.txt";

Deno.test("2021 > day 1 > part 1 > example", () => {
  assertEquals(calculatePartOne(TEST_INPUT), 7);
});

Deno.test("2021 > day 1 > part 2 > example", () => {
  assertEquals(calculatePartTwo(TEST_INPUT), 5);
});

Deno.test("2021 > day 1 > part 1 > actual", async () => {
  const data = await getLinesAsNumbers(ACTUAL_INPUT_PATH);
  assertEquals(calculatePartOne(data), 1564);
});

Deno.test("2021 > day 1 > part 2 > actual", async () => {
  const data = await getLinesAsNumbers(ACTUAL_INPUT_PATH);
  assertEquals(calculatePartTwo(data), 1611);
});
