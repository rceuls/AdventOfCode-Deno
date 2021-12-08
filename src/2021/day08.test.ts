import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { getLines } from "../shared/file-util.ts";
import { TEST_DEFAULTS } from "../shared/test-util.ts";
import { calculateDay08Part01, calculateDay08Part02 } from "./day08.ts";

Deno.test({
  name: "2021 > day 7 > part 1 > example",
  fn() {
    const result = calculateDay08Part01(getLines("day08.test.input.txt", 2021));
    assertEquals(result, 26);
  },
  ...TEST_DEFAULTS,
});

Deno.test({
  name: "2021 > day 7 > part 2 > example",
  fn() {
    const result = calculateDay08Part02(getLines("day08.test.input.txt", 2021));
    assertEquals(result, 61229);
  },
  ...TEST_DEFAULTS,
});

Deno.test({
  name: "2021 > day 7 > part 2 > smol example",
  fn() {
    const result = calculateDay08Part02([
      "acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf",
    ]);
    assertEquals(result, 5353);
  },
  ...TEST_DEFAULTS,
});

Deno.test({
  name: "2021 > day 7 > part 1 > actual",
  fn() {
    const result = calculateDay08Part01(getLines("day08.input.txt", 2021));
    assertEquals(result, 445);
  },
  ...TEST_DEFAULTS,
});

Deno.test({
  name: "2021 > day 7 > part 2 > actual",
  fn() {
    const result = calculateDay08Part02(getLines("day08.input.txt", 2021));
    assertEquals(result, 1043101);
  },
  ...TEST_DEFAULTS,
});
