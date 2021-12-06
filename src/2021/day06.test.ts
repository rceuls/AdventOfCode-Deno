import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { calculateDay06 } from "./day06.ts";
import { TEST_DEFAULTS } from "../shared/test-util.ts";
import { getText } from "../shared/file-util.ts";

Deno.test({
  name: "2021 > day 6 > part 1 + 2 > example",
  fn() {
    const result = calculateDay06("3,4,3,1,2", 18);
    assertEquals(result, 26);
    const result2 = calculateDay06("3,4,3,1,2", 80);
    assertEquals(result2, 5934);
  },
  ...TEST_DEFAULTS,
});

Deno.test({
  name: "2021 > day 6 > part 1 + 2 > actual",
  fn() {
    const text = getText("day06.input.txt", 2021);
    const result = calculateDay06(text, 80);
    assertEquals(result, 374994);

    const result2 = calculateDay06(text, 256);
    assertEquals(result2, 1686252324092);
  },
  ...TEST_DEFAULTS,
});
