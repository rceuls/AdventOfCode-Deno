const isSmall = (input: string) => /[a-z]/.test(input);

const calculate = (input: string[], maxDuplicateVisits: number) => {
  const lines = input.map((x) => x.split("-"));
  const connections: { [name: string]: string[] } = {};
  for (const [from, to] of lines) {
    if (to !== "start" && from !== "end") {
      connections[from] = connections[from] ?? [];
      connections[from].push(to);
    }
    if (from !== "start" && to !== "end") {
      connections[to] = connections[to] ?? [];
      connections[to].push(from);
    }
  }

  let validPathCount = 0;
  let paths = [["start"]];
  while (paths.length) {
    const nextPaths = [];
    for (const path of paths) {
      const cave = path[path.length - 1];
      for (const nextCave of connections[cave]) {
        const nextPath = [...path, nextCave];
        if (nextCave === "end") {
          validPathCount += 1;
          continue;
        }
        const smallCaves = nextPath.filter(isSmall);
        if (smallCaves.length > new Set(smallCaves).size + maxDuplicateVisits) {
          continue;
        }
        nextPaths.push(nextPath);
      }
    }
    paths = nextPaths;
  }
  return validPathCount;
};

export { calculate as calculateDay12 };
