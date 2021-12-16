import { versionSum } from "./day16.ts";
import { getText } from "../shared/file-util.ts";
import { TEST_DEFAULTS } from "../shared/test-util.ts";
import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";

const input = getText("day16.input.txt", 2021);

Deno.test({
  name: "2021 > day 16 > part 1 > example",
  fn() {
    assertEquals(versionSum("8A004A801A8002F478"), 16);
    assertEquals(versionSum("620080001611562C8802118E34"), 12);
    assertEquals(versionSum("C0015000016115A2E0802F182340"), 23);
    assertEquals(versionSum("A0016C880162017C3686B18A3D4780"), 31);

    //
    // assertEquals(calculateDay16("8A004A801A8002F478").version, 40);
  },
  ...TEST_DEFAULTS,
});

// Deno.test({
//   name: "2021 > day 16 > part 2 > example",
//   fn() {
//     const data = calculateDay16(inputTest, 5);
//     assertEquals(data, 315);
//   },
//   ...TEST_DEFAULTS,
// });

Deno.test({
  name: "2021 > day 16 > part 1 > actual",
  fn() {
    const data = versionSum(input);
    assertEquals(data, 943);
  },
  ...TEST_DEFAULTS,
});

// Deno.test({
//   name: "2021 > day 16 > part 2 > actual",
//   fn() {
//     const data = calculateDay16(input, 5);
//     assertEquals(data, 2874);
//   },
//   ...TEST_DEFAULTS,
// });
