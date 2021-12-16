type OpsPacket = {
  type: "_ops";
  version: number;
  typeId: number;
  value: number;
  packets: Packet[];
};

type LitPacket = {
  type: "_lit";
  version: number;
  typeId: number;
  value: number;
};

type Packet = OpsPacket | LitPacket;

const HEADER_LENGTH = 6;

const isLiteral = (pk: { typeId: number }) => pk.typeId === 4;

const calculateOps = (input: { typeId: number; children: Packet[] }) => {
  switch (input.typeId) {
    case 0:
      return input.children.reduce((p, n) => p + n.value, 0);
    case 1:
      return input.children.reduce((p, n) => p * n.value, 1);
    case 2:
      return input.children.sort((x, y) => x.value - y.value)[0].value;
    case 3:
      return input.children.sort((x, y) => y.value - x.value)[0].value;
    case 5:
      return input.children[0].value > input.children[1].value ? 1 : 0;
    case 6:
      return input.children[0].value < input.children[1].value ? 1 : 0;
    case 7:
      return input.children[0].value === input.children[1].value ? 1 : 0;
    default:
      console.log("shouldn't be here");
      break;
  }
  return 1;
};

const getMetadata = (input: string[]) => ({
  version: Number.parseInt(input.slice(0, 3).join(""), 2),
  typeId: Number.parseInt(input.slice(3, HEADER_LENGTH).join(""), 2),
});

const getLiteral = (input: string[]) => {
  let number = "";
  let i = 0;
  for (;;) {
    const slice = input.slice(i, i + 5);

    number += slice.slice(1).join("").padEnd(4, "0");
    i += 5;

    if (slice[0] === "0") {
      return { number: Number.parseInt(number, 2), literalLength: i };
    } else {
      continue;
    }
  }
};

const getSubPackets = (input: string[]) => {
  const packets: Packet[] = [];

  let trackedIndex = 0;
  const lengthTypeId = input[0];
  trackedIndex += 1;
  if (lengthTypeId === "0") {
    const totalLength = Number.parseInt(
      input.slice(trackedIndex, trackedIndex + 15).join(""),
      2
    );
    trackedIndex += 15;
    while (trackedIndex < totalLength + 15 + 1) {
      const md = getMetadata(input.slice(trackedIndex));
      trackedIndex += HEADER_LENGTH;
      if (isLiteral(md)) {
        const lit = getLiteral(input.slice(trackedIndex));
        packets.push({ ...md, type: "_lit", value: lit.number });
        trackedIndex += lit.literalLength;
      } else {
        const sub = getSubPackets(input.slice(trackedIndex));
        packets.push({
          ...md,
          type: "_ops",
          value: calculateOps({ typeId: md.typeId, children: sub.packets }),
          packets: sub.packets,
        });
        trackedIndex += sub.treatedLength;
      }
    }
    return { packets, treatedLength: totalLength + 15 + 1 };
  } else {
    const totalItems = Number.parseInt(
      input.slice(trackedIndex, trackedIndex + 11).join(""),
      2
    );
    trackedIndex += 11;
    let treatedItems = 0;
    while (treatedItems < totalItems) {
      const md = getMetadata(input.slice(trackedIndex));
      trackedIndex += HEADER_LENGTH;
      if (isLiteral(md)) {
        const lit = getLiteral(input.slice(trackedIndex));
        packets.push({ ...md, type: "_lit", value: lit.number });
        trackedIndex += lit.literalLength;
      } else {
        const sub = getSubPackets(input.slice(trackedIndex));
        packets.push({
          ...md,
          type: "_ops",
          value: calculateOps({ typeId: md.typeId, children: sub.packets }),
          packets: sub.packets,
        });
        trackedIndex += sub.treatedLength;
      }
      treatedItems += 1;
    }
    return { packets, treatedLength: trackedIndex };
  }
};

const calculate = (input: string) => {
  const binString = input
    .split("")
    .map((x) => Number.parseInt(x, 16).toString(2).padStart(4, "0"))
    .join("")
    .split("");
  const packets: Packet[] = [];

  const md = getMetadata(binString);
  if (isLiteral(md)) {
    packets.push({
      ...md,
      type: "_lit",
      value: getLiteral(binString.slice(HEADER_LENGTH)).number,
    });
  } else {
    const sb = getSubPackets(binString.slice(HEADER_LENGTH)).packets;
    packets.push({
      ...md,
      type: "_ops",
      packets: sb,
      value: calculateOps({ ...md, children: sb }),
    });
  }

  return packets[0];
};

const versionSumPkt: (packet: Packet) => number = (packet: Packet) => {
  let vsn = packet.version;
  if (packet.type === "_ops") {
    for (const p of packet.packets) {
      vsn += versionSumPkt(p);
    }
  }
  return vsn;
};

const versionSum = (input: string) => versionSumPkt(calculate(input));

export { calculate as calculateDay16, versionSum };
