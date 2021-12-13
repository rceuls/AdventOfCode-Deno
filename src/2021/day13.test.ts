import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { calculateDay13 } from "./day13.ts";
import { getText } from "../shared/file-util.ts";
import { TEST_DEFAULTS } from "../shared/test-util.ts";

const input = getText("day13.input.txt", 2021);
const inputTest = getText("day13.test.input.txt", 2021);

Deno.test({
  name: "2021 > day 13 > part 1 > example",
  fn() {
    const result = calculateDay13(inputTest, true);
    assertEquals(result, 17);
  },
  ...TEST_DEFAULTS,
});

Deno.test({
  name: "2021 > day 13 > part 2 > example",
  fn() {
    const result = calculateDay13(inputTest, false);
    assertEquals(result, 16);
  },
  ...TEST_DEFAULTS,
});

Deno.test({
  name: "2021 > day 13 > part 2 > actual",
  fn() {
    const result = calculateDay13(input, false, true);
    assertEquals(result, 103);
  },
  ...TEST_DEFAULTS,
});
