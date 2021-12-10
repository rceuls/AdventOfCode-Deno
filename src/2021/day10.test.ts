import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { calculateDay10 } from "./day10.ts";
import { getLines } from "../shared/file-util.ts";
import { TEST_DEFAULTS } from "../shared/test-util.ts";

const input = getLines("day10.input.txt", 2021);
const inputTest = getLines("day10.test.input.txt", 2021);

Deno.test({
  name: "2021 > day 10 > part 1 + 2 > example",
  fn() {
    const ret = calculateDay10(inputTest);
    assertEquals(ret.mismatch, 26397);
    assertEquals(ret.adding, 288957);
  },
  ...TEST_DEFAULTS,
});

Deno.test({
  name: "2021 > day 10 > part 1 + 2 > actual",
  fn() {
    const result = calculateDay10(input);
    assertEquals(result.mismatch, 296535);
    assertEquals(result.adding, 4245130838);
  },
  ...TEST_DEFAULTS,
});
