type Line = {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
};

const parseLine = (input: string) => {
  const parsed = input.split(" -> ");
  const fromParsed = parsed[0].split(",");
  const toParsed = parsed[1].split(",");
  return {
    fromX: +fromParsed[0],
    fromY: +fromParsed[1],
    toX: +toParsed[0],
    toY: +toParsed[1],
  };
};

const calculate = (input: string[], calculateDiagonals: boolean) => {
  const lines: Line[] = [];
  let maxX = 0;
  let maxY = 0;
  for (let i = 0; i < input.length; i++) {
    const parsed = parseLine(input[i]);

    if (
      !calculateDiagonals &&
      parsed.fromX !== parsed.toX &&
      parsed.fromY !== parsed.toY
    ) {
      continue;
    }

    if (maxX < parsed.fromX) maxX = parsed.fromX;
    if (maxX < parsed.toX) maxX = parsed.toX;

    if (maxY < parsed.fromY) maxY = parsed.fromY;
    if (maxY < parsed.toY) maxY = parsed.toY;

    lines.push(parsed);
  }

  const positionHitCountA: number[][] = [];

  for (let i = 0; i <= maxX; i++) {
    positionHitCountA.push(new Array(maxY + 1).fill(0));
  }

  for (let i = 0; i < lines.length; i++) {
    const item = lines[i];

    const maxX = item.fromX > item.toX ? item.fromX : item.toX;
    const maxY = item.fromY > item.toY ? item.fromY : item.toY;
    const minX = item.fromX < item.toX ? item.fromX : item.toX;
    const minY = item.fromY < item.toY ? item.fromY : item.toY;

    if (item.fromX === item.toX) {
      for (let j = minY; j <= maxY; j++) {
        positionHitCountA[item.fromX][j] += 1;
      }
    } else if (item.fromY === item.toY) {
      for (let j = minX; j <= maxX; j++) {
        positionHitCountA[j][item.fromY] += 1;
      }
    } else if (calculateDiagonals) {
      const xGoesDown = item.fromX > item.toX;
      const yGoesDown = item.fromY > item.toY;

      let currX = item.fromX;
      let currY = item.fromY;

      for (;;) {
        positionHitCountA[currX][currY] += 1;

        currX += xGoesDown ? -1 : 1;
        currY += yGoesDown ? -1 : 1;

        if (!xGoesDown && currX > maxX) break;
        if (xGoesDown && currX < minX) break;
        if (!yGoesDown && currY > maxY) break;
        if (yGoesDown && currY < minY) break;
      }
    }
  }

  let multipleHits = 0;

  for (let i = 0; i <= maxX; i++) {
    for (let j = 0; j <= maxY; j++) {
      if (positionHitCountA[i][j] > 1) {
        multipleHits += 1;
      }
    }
  }

  return multipleHits;
};

export { calculate as calculateDay05 };
