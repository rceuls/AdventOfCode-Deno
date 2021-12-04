import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { calculateDay04 } from "./day04.ts";
import { getText } from "../shared/file-util.ts";
import { TEST_DEFAULTS } from "../shared/test-util.ts";

Deno.test({
  name: "2021 > day 4 > part 1 + 2 > example",
  fn() {
    const TEST_INPUT = getText("day04.test.input.txt", 2021);

    const result = calculateDay04(TEST_INPUT);

    assertEquals(result.first, 4512);
    assertEquals(result.last, 1924);
  },
  ...TEST_DEFAULTS,
});

Deno.test({
  name: "2021 > day 4 > part 1 + 2 > actual",
  fn() {
    const FILE_INPUT = getText("day04.input.txt", 2021);

    const result = calculateDay04(FILE_INPUT);

    assertEquals(result.first, 29440);
    assertEquals(result.last, 13884);
  },
  ...TEST_DEFAULTS,
});
