import { versionSum, calculateDay16 } from "./day16.ts";
import { getText } from "../shared/file-util.ts";
import { TEST_DEFAULTS } from "../shared/test-util.ts";
import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";

const input = getText("day16.input.txt", 2021);

Deno.test({
  name: "2021 > day 16 > part 2 > example",
  fn() {
    assertEquals(calculateDay16("C200B40A82").value, 3);
    assertEquals(calculateDay16("04005AC33890").value, 54);
    assertEquals(calculateDay16("880086C3E88112").value, 7);
    assertEquals(calculateDay16("CE00C43D881120").value, 9);
    assertEquals(calculateDay16("D8005AC2A8F0").value, 1);
    assertEquals(calculateDay16("F600BC2D8F").value, 0);
    assertEquals(calculateDay16("9C005AC2F8F0").value, 0);
    assertEquals(calculateDay16("9C0141080250320F1802104A08").value, 1);
  },
  ...TEST_DEFAULTS,
});

Deno.test({
  name: "2021 > day 16 > part 1 > actual",
  fn() {
    const data = versionSum(input);
    assertEquals(data, 943);
  },
  ...TEST_DEFAULTS,
});

Deno.test({
  name: "2021 > day 16 > part 2 > actual",
  fn() {
    const data = calculateDay16(input);
    assertEquals(data.value, 167737115857);
  },
  ...TEST_DEFAULTS,
});
