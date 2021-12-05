import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { calculateDay05Part01, calculateDay05Part02 } from "./day05.ts";
import { getLines } from "../shared/file-util.ts";
import { TEST_DEFAULTS } from "../shared/test-util.ts";

Deno.test({
  name: "2021 > day 5 > part 1 > example",
  fn() {
    const TEST_INPUT = getLines("day05.test.input.txt", 2021);

    const result = calculateDay05Part01(TEST_INPUT);
    assertEquals(result, 5);
  },
  ...TEST_DEFAULTS,
});

Deno.test({
  name: "2021 > day 5 > part 2 > example",
  fn() {
    const TEST_INPUT = getLines("day05.test.input.txt", 2021);

    const result = calculateDay05Part02(TEST_INPUT);
    assertEquals(result, 12);
  },
  ...TEST_DEFAULTS,
});

Deno.test({
  name: "2021 > day 5 > part 1 > actual",
  fn() {
    const TEST_INPUT = getLines("day05.input.txt", 2021);

    const result = calculateDay05Part01(TEST_INPUT);
    assertEquals(result, 4655);
  },
  ...TEST_DEFAULTS,
});

Deno.test({
  name: "2021 > day 5 > part 2 > actual",
  fn() {
    const TEST_INPUT = getLines("day05.input.txt", 2021);

    const result = calculateDay05Part02(TEST_INPUT);
    assertEquals(result, 20500);
  },
  ...TEST_DEFAULTS,
});
