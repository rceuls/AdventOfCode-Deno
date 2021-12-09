import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { calculateDay01Part01, calculateDay01Part02 } from "./day01.ts";
import { getText } from "../shared/file-util.ts";
import { TEST_DEFAULTS } from "../shared/test-util.ts";

Deno.test({
  name: "2015 > day 1 > part 1 > actual",
  fn() {
    const input = getText("day01.input.txt", 2015);

    assertEquals(calculateDay01Part01(input), 232);
  },
  ...TEST_DEFAULTS,
});

Deno.test({
  name: "2015 > day 1 > part 2 > actual",
  fn() {
    const input = getText("day01.input.txt", 2015);

    assertEquals(calculateDay01Part02(input), 1783);
  },
  ...TEST_DEFAULTS,
});
