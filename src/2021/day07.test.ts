import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { getText } from "../shared/file-util.ts";
import { TEST_DEFAULTS } from "../shared/test-util.ts";
import { calculateDay07Part02, calculateDay07Part01 } from "./day07.ts";

Deno.test({
  name: "2021 > day 7 > part 1 > example",
  fn() {
    const result = calculateDay07Part01("16,1,2,0,4,2,7,1,2,14");
    assertEquals(result, 37);
  },
  ...TEST_DEFAULTS,
});

Deno.test({
  name: "2021 > day 7 > part 2 > example",
  fn() {
    const result = calculateDay07Part02("16,1,2,0,4,2,7,1,2,14");
    assertEquals(result, 168);
  },
  ...TEST_DEFAULTS,
});

Deno.test({
  name: "2021 > day 7 > part 1 > actual",
  fn() {
    const result = calculateDay07Part01(getText("day07.input.txt", 2021));
    assertEquals(result, 355150);
  },
  ...TEST_DEFAULTS,
});

Deno.test({
  name: "2021 > day 7 > part 2 > actual",
  fn() {
    const result = calculateDay07Part02(getText("day07.input.txt", 2021));
    assertEquals(result, 98368490);
  },
  ...TEST_DEFAULTS,
});
