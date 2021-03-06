import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { calculateDay03Part01, calculateDay03Part02 } from "./day03.ts";
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

Deno.test("2021 > day 3 > part 1 > example", () => {
  const result = calculateDay03Part01(TEST_INPUT);

  assertEquals(result, 198);
});

Deno.test("2021 > day 3 > part 1 > actual", () => {
  const input = getLines("day03.input.txt", 2021);

  const result = calculateDay03Part01(input);

  assertEquals(result, 4006064);
});

Deno.test("2021 > day 3 > part 2 > example", () => {
  const result = calculateDay03Part02(TEST_INPUT);

  assertEquals(result, 230);
});

Deno.test("2021 > day 3 > part 2 > actual", () => {
  const input = getLines("day03.input.txt", 2021);

  const result = calculateDay03Part02(input);

  assertEquals(result, 5941884);
});
