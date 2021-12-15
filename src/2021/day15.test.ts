import { calculateDay15 } from "./day15.ts";
import { getText } from "../shared/file-util.ts";
import { TEST_DEFAULTS } from "../shared/test-util.ts";
import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";

const input = getText("day15.input.txt", 2021);
const inputTest = getText("day15.test.input.txt", 2021);

Deno.test({
  name: "2021 > day 15 > part 1 > example",
  fn() {
    const data = calculateDay15(inputTest, 1);
    assertEquals(data, 40);
  },
  ...TEST_DEFAULTS,
});

Deno.test({
  name: "2021 > day 15 > part 2 > example",
  fn() {
    const data = calculateDay15(inputTest, 5);
    assertEquals(data, 315);
  },
  ...TEST_DEFAULTS,
});

Deno.test({
  name: "2021 > day 15 > part 1 > actual",
  fn() {
    const data = calculateDay15(input, 1);
    assertEquals(data, 562);
  },
  ...TEST_DEFAULTS,
});

Deno.test({
  name: "2021 > day 15 > part 2 > actual",
  fn() {
    const data = calculateDay15(input, 5);
    assertEquals(data, 2874);
  },
  ...TEST_DEFAULTS,
});
