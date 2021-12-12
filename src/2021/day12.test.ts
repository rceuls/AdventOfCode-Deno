import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { calculateDay12 } from "./day12.ts";
import { getLines } from "../shared/file-util.ts";
import { TEST_DEFAULTS } from "../shared/test-util.ts";

const input = getLines("day12.input.txt", 2021);
const inputTest = getLines("day12.test.input.txt", 2021);

Deno.test({
  name: "2021 > day 12 > part 1 > example",
  fn() {
    const result = calculateDay12(inputTest, 0);
    assertEquals(result, 226);
  },
  ...TEST_DEFAULTS,
});

Deno.test({
  name: "2021 > day 12 > part 2 > example",
  fn() {
    const result = calculateDay12(inputTest, 1);
    assertEquals(result, 3509);
  },
  ...TEST_DEFAULTS,
});

Deno.test({
  name: "2021 > day 12 > part 1 > actual",
  fn() {
    const result = calculateDay12(input, 0);
    assertEquals(result, 5212);
  },
  ...TEST_DEFAULTS,
});

Deno.test({
  name: "2021 > day 12 > part 2 > example",
  fn() {
    const result = calculateDay12(input, 1);
    assertEquals(result, 134862);
  },
  ...TEST_DEFAULTS,
});
