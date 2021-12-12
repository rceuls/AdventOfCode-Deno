import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { calculateDay11 } from "./day11.ts";
import { getText } from "../shared/file-util.ts";
import { TEST_DEFAULTS } from "../shared/test-util.ts";

const input = getText("day11.input.txt", 2021);
const inputTest = getText("day11.test.input.txt", 2021);

Deno.test({
  name: "2021 > day 11 > part 1 + 2 > example",
  fn() {
    const result = calculateDay11(inputTest, [99]);
    assertEquals(result, {
      finalIt: 195,
      seqFlash: {
        "99": 1656,
      },
    });
  },
  ...TEST_DEFAULTS,
});

Deno.test({
  name: "2021 > day 11 > part 1 + 2 > actual",
  fn() {
    const result = calculateDay11(input, [99]);
    assertEquals(result, {
      finalIt: 329,
      seqFlash: {
        "99": 1627,
      },
    });
  },
  ...TEST_DEFAULTS,
});
