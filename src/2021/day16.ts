type OpsPacket = PacketHeader & {
  type: "_ops";
  value: number;
  packets: Packet[];
};

type LitPacket = PacketHeader & {
  type: "_lit";
  value: number;
};

type PacketHeader = {
  version: number;
  typeId: number;
};

type Packet = OpsPacket | LitPacket;

const HEADER_LENGTH = 6;
const FIELDS = {
  "0": 15,
  "1": 11,
};

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
      throw new Error("shouldn't be here");
  }
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
      return { number: Number.parseInt(number, 2), treatedLength: i };
    } else {
      continue;
    }
  }
};

const treatPacket = (
  input: string[],
  trackedIndex: number,
  packets: Packet[]
) => {
  const md = getMetadata(input.slice(trackedIndex));
  trackedIndex += HEADER_LENGTH;
  if (isLiteral(md)) {
    const lit = getLiteral(input.slice(trackedIndex));
    packets.push({ ...md, type: "_lit", value: lit.number });
    trackedIndex += lit.treatedLength;
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
  return trackedIndex;
};

const getSubPackets = (input: string[]) => {
  const packets: Packet[] = [];

  let trackedIndex = 0;
  const lengthTypeId = input[0] === "0" ? "0" : "1";
  trackedIndex += 1;
  const subLength = FIELDS[lengthTypeId];

  const totalLength = Number.parseInt(
    input.slice(trackedIndex, trackedIndex + subLength).join(""),
    2
  );
  trackedIndex += subLength;

  if (lengthTypeId === "0") {
    const treatedLength = totalLength + subLength + 1;
    while (trackedIndex < treatedLength) {
      trackedIndex = treatPacket(input, trackedIndex, packets);
    }
    return {
      packets,
      treatedLength,
    };
  } else {
    for (let treatedItems = 0; treatedItems < totalLength; treatedItems++) {
      trackedIndex = treatPacket(input, trackedIndex, packets);
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

const versionSumPkt = (packet: Packet) => {
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
