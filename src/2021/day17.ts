type TargetArea = {
  x: { max: number; min: number };
  y: { max: number; min: number };
};

const isValidVelocity = (coord: { x: number; y: number }, area: TargetArea) =>
  area.x.min <= coord.x &&
  area.x.max >= coord.x &&
  area.y.min <= coord.y &&
  area.y.max >= coord.y;

const willNotConverge = (coord: { x: number; y: number }, area: TargetArea) =>
  area.y.min >= coord.y;

const isHit = (currVel: { x: number; y: number }, coords: TargetArea) => {
  let maxY = -Infinity;
  const currPos: { x: number; y: number } = { x: 0, y: 0 };
  for (;;) {
    currPos.x += currVel.x;
    currPos.y += currVel.y;
    if (currPos.y > maxY) {
      maxY = currPos.y;
    }
    if (isValidVelocity(currPos, coords)) {
      return true;
    } else if (willNotConverge(currPos, coords)) {
      return false;
    } else {
      currVel.x += currVel.x === 0 ? 0 : currVel.x < 0 ? 1 : -1;
      currVel.y -= 1;
    }
  }
};

const calculate = (input: string) => {
  const coordsRaw = input
    .replace("target area: ", "")
    .split(", ")
    .map((x) => x.replace("x=", "").replace("y=", "").split("..").map(Number));
  const coords = {
    x: {
      max: coordsRaw[0][1],
      min: coordsRaw[0][0],
    },
    y: {
      max: coordsRaw[1][1],
      min: coordsRaw[1][0],
    },
  };

  const hitVelocities = new Set<string>();
  const maxY = Math.abs(coords.y.max) * 2;
  const maxX = coords.x.max * 2;

  for (let y = coords.y.min; y < maxY; y++) {
    for (let x = 0; x < maxX; x++) {
      const result = isHit({ x, y }, coords);

      if (result) {
        hitVelocities.add(`${x}:${y}`);
      }
    }
  }

  return {
    maxHeight: (Math.abs(coords.y.min) * Math.abs(coords.y.min + 1)) / 2,
    hits: hitVelocities.size,
  };
};

export { calculate as calculateDay17 };
