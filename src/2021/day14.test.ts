import { calculateDay14 } from "./day14.ts";
import { getText } from "../shared/file-util.ts";
import { TEST_DEFAULTS } from "../shared/test-util.ts";
import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";

const input = getText("day14.input.txt", 2021);
const inputTest = getText("day14.test.input.txt", 2021);

Deno.test({
  name: "2021 > day 14 > part 1 > example",
  fn() {
    const data = calculateDay14(inputTest, 10);
    assertEquals(data, 1588);
  },
  ...TEST_DEFAULTS,
});

Deno.test({
  name: "2021 > day 14 > part 1 > actual",
  fn() {
    const data = calculateDay14(input, 10);
    assertEquals(data, 3058);
  },
  ...TEST_DEFAULTS,
});

Deno.test({
  name: "2021 > day 14 > part 2 > actual",
  fn() {
    const data = calculateDay14(input, 40);
    assertEquals(data, 3447389044530);
  },
  ...TEST_DEFAULTS,
});
