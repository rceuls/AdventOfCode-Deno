import { calculateDay17 } from "./day17.ts";
// import { getText } from "../shared/file-util.ts";
import { TEST_DEFAULTS } from "../shared/test-util.ts";
import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";

const input = "target area: x=102..157, y=-146..-90";

Deno.test({
  name: "2021 > day 17 > part 1 > example",
  fn() {
    assertEquals(calculateDay17("target area: x=20..30, y=-10..-5"), {
      maxHeight: 45,
      hits: 112,
    });
  },
  ...TEST_DEFAULTS,
});

Deno.test({
  name: "2021 > day 17 > part 1 > actual",
  fn() {
    const data = calculateDay17(input);
    assertEquals(data, {
      maxHeight: 10585,
      hits: 5247,
    });
  },
  ...TEST_DEFAULTS,
});

// Deno.test({
//   name: "2021 > day 17 > part 1 > actual",
//   fn() {
//     const data = calculateDay17(input, 1);
//     assertEquals(data, 562);
//   },
//   ...TEST_DEFAULTS,
// });

// Deno.test({
//   name: "2021 > day 17 > part 2 > actual",
//   fn() {
//     const data = calculateDay17(input, 5);
//     assertEquals(data, 2874);
//   },
//   ...TEST_DEFAULTS,
// });
