import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { calculateDay01Part01, calculateDay01Part02 } from "./day01.ts";
import { getLinesAsNumbers } from "../shared/file-util.ts";
import { TEST_DEFAULTS } from "../shared/test-util.ts";

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

Deno.test({
  name: "2021 > day 1 > part 1 > example",
  fn() {
    assertEquals(calculateDay01Part01(TEST_INPUT), 7);
  },
  sanitizeOps: false,
});

Deno.test({
  name: "2021 > day 1 > part 2 > example",
  fn() {
    assertEquals(calculateDay01Part02(TEST_INPUT), 5);
  },
  ...TEST_DEFAULTS,
});

Deno.test({
  name: "2021 > day 1 > part 2 > example",
  fn() {
    const input = getLinesAsNumbers("day01.input.txt", 2021);

    assertEquals(calculateDay01Part01(input), 1564);
  },
  ...TEST_DEFAULTS,
});

Deno.test({
  name: "2021 > day 1 > part 2 > example",
  fn() {
    const input = getLinesAsNumbers("day01.input.txt", 2021);

    assertEquals(calculateDay01Part02(input), 1611);
  },
  ...TEST_DEFAULTS,
});
