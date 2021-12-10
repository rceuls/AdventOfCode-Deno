import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { calculateDay10Part01, calculateDay10Part02 } from "./day10.ts";
import { getLines } from "../shared/file-util.ts";
import { TEST_DEFAULTS } from "../shared/test-util.ts";

Deno.test({
  name: "2021 > day 10 > part 1 > example",
  fn() {
    assertEquals(
      calculateDay10Part01(getLines("day10.test.input.txt", 2021)).points,
      26397
    );
  },
  ...TEST_DEFAULTS,
});

Deno.test({
  name: "2021 > day 10 > part 2 > example",
  fn() {
    assertEquals(
      calculateDay10Part02(getLines("day10.test.input.txt", 2021)),
      288957
    );
  },
  ...TEST_DEFAULTS,
});

Deno.test({
  name: "2021 > day 10 > part 2 > example smol",
  fn() {
    assertEquals(calculateDay10Part02(["<{([{{}}[<[[[<>{}]]]>[]]"]), 294);
  },
  ...TEST_DEFAULTS,
});

Deno.test({
  name: "2021 > day 10 > part 1 > actual",
  fn() {
    const input = getLines("day10.input.txt", 2021);
    assertEquals(calculateDay10Part01(input).points, 296535);
  },
  ...TEST_DEFAULTS,
});

Deno.test({
  name: "2021 > day 10 > part 2 > actual",
  fn() {
    const input = getLines("day10.input.txt", 2021);
    assertEquals(calculateDay10Part02(input), 4245130838);
  },
  ...TEST_DEFAULTS,
});
