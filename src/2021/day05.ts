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

const calculate = (input: string[]) => {
  const lines = [];
  for (let i = 0; i < input.length; i++) {
    lines.push(parseLine(input[i]));
  }

  const relevantLines = [];
  for (let i = 0; i < input.length; i++) {
    const item = lines[i];
    if (item.fromX === item.toX || item.fromY === item.toY) {
      relevantLines.push(item);
    }
  }

  const positionHitCount: { [name: string]: number } = {};
  for (let i = 0; i < relevantLines.length; i++) {
    const item = relevantLines[i];
    if (item.fromX === item.toX) {
      const max = item.fromY > item.toY ? item.fromY : item.toY;
      const min = max === item.fromY ? item.toY : item.fromY;
      for (let j = min; j <= max; j++) {
        // deno-lint-ignore no-inferrable-types
        const key: string = `${item.fromX}:${j}`;
        if (!(key in positionHitCount)) {
          positionHitCount[key] = 0;
        }
        positionHitCount[key] += 1;
      }
    } else if (item.fromY === item.toY) {
      const max = item.fromX > item.toX ? item.fromX : item.toX;
      const min = max === item.fromX ? item.toX : item.fromX;
      for (let j = min; j <= max; j++) {
        // deno-lint-ignore no-inferrable-types
        const key: string = `${j}:${item.fromY}`;
        if (!(key in positionHitCount)) {
          positionHitCount[key] = 0;
        }
        positionHitCount[key] += 1;
      }
    }
  }
  const keys = Object.keys(positionHitCount);
  let multipleHits = 0;
  for (let i = 0; i < keys.length; i++) {
    if (positionHitCount[keys[i]] >= 2) {
      multipleHits += 1;
    }
  }
  return multipleHits;
};

const calculateDiagonals = (input: string[]) => {
  const lines: Line[] = [];
  for (let i = 0; i < input.length; i++) {
    lines.push(parseLine(input[i]));
  }
  const positionHitCount: { [name: string]: number } = {};
  for (let i = 0; i < lines.length; i++) {
    const item = lines[i];
    if (item.fromX === item.toX) {
      const max = item.fromY > item.toY ? item.fromY : item.toY;
      const min = max === item.fromY ? item.toY : item.fromY;
      for (let j = min; j <= max; j++) {
        // deno-lint-ignore no-inferrable-types
        const key: string = `${item.fromX}:${j}`;
        if (!(key in positionHitCount)) {
          positionHitCount[key] = 0;
        }
        positionHitCount[key] += 1;
      }
    } else if (item.fromY === item.toY) {
      const max = Math.max(item.fromX, item.toX);
      const min = max === item.fromX ? item.toX : item.fromX;
      for (let j = min; j <= max; j++) {
        // deno-lint-ignore no-inferrable-types
        const key: string = `${j}:${item.fromY}`;
        if (!(key in positionHitCount)) {
          positionHitCount[key] = 0;
        }
        positionHitCount[key] += 1;
      }
    } else {
      const xGoesDown = item.fromX > item.toX;
      const yGoesDown = item.fromY > item.toY;
      const maxX = item.fromX > item.toX ? item.fromX : item.toX;
      const maxY = item.fromY > item.toY ? item.fromY : item.toY;
      const minX = item.fromX < item.toX ? item.fromX : item.toX;
      const minY = item.fromY < item.toY ? item.fromY : item.toY;

      let currX = item.fromX;
      let currY = item.fromY;

      for (;;) {
        // deno-lint-ignore no-inferrable-types
        const key: string = `${currX}:${currY}`;
        if (!(key in positionHitCount)) {
          positionHitCount[key] = 0;
        }
        positionHitCount[key] += 1;

        currX += xGoesDown ? -1 : 1;
        currY += yGoesDown ? -1 : 1;

        if (!xGoesDown && currX > maxX) {
          break;
        }
        if (xGoesDown && currX < minX) {
          break;
        }
        if (!yGoesDown && currY > maxY) {
          break;
        }
        if (yGoesDown && currY < minY) {
          break;
        }
      }
    }
  }

  const keys = Object.keys(positionHitCount);
  let multipleHits = 0;

  for (let i = 0; i < keys.length; i++) {
    if (positionHitCount[keys[i]] >= 2) {
      multipleHits += 1;
    }
  }
  return multipleHits;
};

export {
  calculate as calculateDay05Part01,
  calculateDiagonals as calculateDay05Part02,
};
