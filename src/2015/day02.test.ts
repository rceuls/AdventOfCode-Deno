import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { calculateDay02Part01, calculateDay02Part02 } from "./day02.ts";
import { getLines } from "../shared/file-util.ts";
import { TEST_DEFAULTS } from "../shared/test-util.ts";

Deno.test({
  name: "2015 > day 2 > part 1 > actual",
  fn() {
    const input = getLines("day02.input.txt", 2015);

    assertEquals(calculateDay02Part01(input), 1606483);
  },
  ...TEST_DEFAULTS,
});

Deno.test({
  name: "2015 > day 2 > part 2 > actual",
  fn() {
    const input = getLines("day02.input.txt", 2015);

    assertEquals(calculateDay02Part02(input), 3842356);
  },
  ...TEST_DEFAULTS,
});
