const calculateDistance = (map: number[][]) => {
  const adjacentPositions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  const startPos = [0, 0];

  const queue = [{ pos: startPos, cost: 0 }];
  const visited = new Set();
  while (queue.length) {
    const shifted = queue.shift();
    if (!shifted) break;
    const {
      pos: [x, y],
      cost,
    } = shifted;
    if (y === map.length - 1 && x === map[0].length - 1) return cost;

    adjacentPositions
      .map(([dx, dy]) => [dx + x, dy + y])
      .filter(([x, y]) => map[y]?.[x])
      .filter((pos) => !visited.has(pos + ""))
      .forEach((pos) => {
        visited.add(pos + "");
        queue.push({ pos, cost: cost + map[pos[1]][pos[0]] });
      });
    queue.sort((a, b) => a.cost - b.cost);
  }

  return queue[0];
};

const calculate = (input: string, mapSize: number) => {
  const map = input.split("\n").map((row) => row.split("").map(Number));
  const expandedMap = [...Array(map.length * mapSize)].map((_, y) =>
    [...Array(map[0].length * mapSize)].map(
      (_, x) =>
        1 +
        ((map[y % map.length][x % map[0].length] -
          1 +
          Math.trunc(x / map[0].length) +
          Math.trunc(y / map.length)) %
          9)
    )
  );
  return calculateDistance(expandedMap);
};

export { calculate as calculateDay15 };
