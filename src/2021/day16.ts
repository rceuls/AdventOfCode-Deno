type Packet = {
  version: number;
  typeId: number;
  packets?: Packet[];
  literal?: number;
};

const isLiteral = (pk: Packet) => pk.typeId === 4;

const getMetadata = (input: string[]) => ({
  version: Number.parseInt(input.slice(0, 3).join(""), 2),
  typeId: Number.parseInt(input.slice(3, 6).join(""), 2),
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
  const lengthType = input[0];
  const packets: Packet[] = [];
  let currIndex = 1;

  if (lengthType === "0") {
    const subPacketLength = Number.parseInt(
      input.slice(currIndex, currIndex + 15).join(""),
      2
    );
    currIndex += 15;

    // const subPacketArea = input.slice(currIndex, currIndex + subPacketLength);

    while (currIndex <= subPacketLength) {
      const nextSlice = input.slice(currIndex);
      const md = getMetadata(nextSlice);
      currIndex += 6;

      const pkt: Packet = { ...md, packets: [] };
      if (isLiteral(pkt)) {
        const lit = getLiteral(nextSlice.slice(6));
        pkt.literal = lit.number;
        currIndex += lit.literalLength;
      } else {
        const subPackets = getSubPackets(nextSlice.slice(6));
        pkt.packets = subPackets.packets;
        currIndex += subPackets.treatedLength;
      }
      packets.push(pkt);
    }
  } else {
    const subPacketCount = Number.parseInt(
      input.slice(currIndex, currIndex + 11).join(""),
      2
    );
    currIndex += 11;

    while (packets.length <= subPacketCount) {
      const nextSlice = input.slice(currIndex);
      const md = getMetadata(nextSlice);
      currIndex += 6;
      const pkt: Packet = { ...md, packets: [] };
      if (isLiteral(pkt)) {
        const lit = getLiteral(nextSlice.slice(6));
        pkt.literal = lit.number;
        currIndex += lit.literalLength;
      } else {
        const subPackets = getSubPackets(nextSlice.slice(6));
        pkt.packets = subPackets.packets;
        currIndex += subPackets.treatedLength;
      }
      packets.push(pkt);
    }
  }
  return {
    packets: packets.filter((x) => !isNaN(x.version)),
    treatedLength: currIndex,
  };
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
      literal: getLiteral(binString.slice(6)).number,
    });
  } else {
    packets.push({
      ...md,
      packets: getSubPackets(binString.slice(6)).packets,
    });
  }

  // console.log(JSON.stringify(packets[0]));
  return packets[0];
};

const versionSumPkt: (packet: Packet) => number = (packet: Packet) => {
  let vsn = packet.version;
  for (const p of packet.packets ?? []) {
    vsn += versionSumPkt(p);
  }
  return vsn;
};

const versionSum = (input: string) => versionSumPkt(calculate(input));
export { calculate as calculateDay16, versionSum };
