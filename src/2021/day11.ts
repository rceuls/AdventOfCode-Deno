const getSurroundCoordinates = (x: number, y: number) => {
  const items = [];
  items.push([y, x]);

  for (const xA of [-1, +1, 0]) {
    for (const yA of [-1, +1, 0]) {
      if (!(yA === 0 && xA === 0)) {
        items.push([y + yA, x + xA]);
      }
    }
  }
  return items.filter((d) => d[0] >= 0 && d[0] < 10 && d[1] >= 0 && d[1] < 10);
};

const flashingFullMatrix = (mtx: number[][]) => {
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      if (mtx[y][x] !== 0) {
        return false;
      }
    }
  }
  return true;
};

const calculate = (input: string, iterations: number[]) => {
  const lines = input.split("\n");
  const matrix: number[][] = [];
  lines.forEach((x) => matrix.push(x.split("").map((x) => +x)));

  const seqFlash: { [name: number]: number } = {};
  let flashes = 0;
  let it = 0;
  for (; !flashingFullMatrix(matrix); it++) {
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        matrix[y][x] += 1;
      }
    }

    const haveFlashed = new Set<string>();
    let doCheck = true;

    do {
      doCheck = false;

      for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
          const key = `${y}:${x}`;
          if (!haveFlashed.has(key) && matrix[y][x] > 9) {
            const surround = getSurroundCoordinates(y, x);
            for (const coord of surround) {
              matrix[coord[1]][coord[0]] += 1;
            }
            haveFlashed.add(key);
            doCheck = true;
          }
        }
      }
    } while (doCheck);

    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        if (matrix[y][x] > 9) {
          matrix[y][x] = 0;
        }
      }
    }
    flashes += haveFlashed.size;
    if (iterations.includes(it)) {
      seqFlash[it] = flashes;
    }
  }

  return {
    seqFlash,
    finalIt: it,
  };
};

export { calculate as calculateDay11 };
