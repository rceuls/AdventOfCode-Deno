import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { calculateDay09Part01, calculateDay09Part02 } from "./day09.ts";
import { getLines } from "../shared/file-util.ts";
import { TEST_DEFAULTS } from "../shared/test-util.ts";

Deno.test({
  name: "2021 > day 9 > part 1 > example",
  fn() {
    assertEquals(
      calculateDay09Part01(getLines("day09.test.input.txt", 2021)).risk,
      15
    );
  },
  ...TEST_DEFAULTS,
});

Deno.test({
  name: "2021 > day 9 > part 2 > example",
  fn() {
    assertEquals(
      calculateDay09Part02(getLines("day09.test.input.txt", 2021)),
      1134
    );
  },
  ...TEST_DEFAULTS,
});

Deno.test({
  name: "2021 > day 9 > part 1 > actual",
  fn() {
    const input = getLines("day09.input.txt", 2021);
    assertEquals(calculateDay09Part01(input).risk, 512);
  },
  ...TEST_DEFAULTS,
});

Deno.test({
  name: "2021 > day 9 > part 2 > actual",
  fn() {
    const input = getLines("day09.input.txt", 2021);
    assertEquals(calculateDay09Part02(input), 1600104);
  },
  ...TEST_DEFAULTS,
});
