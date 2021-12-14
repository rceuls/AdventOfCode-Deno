const calculate = (input: string, iterations: number) => {
  const splitted = input.split("\n\n");
  const template = splitted[0].split("");
  const lookup: { [name: string]: string } = {};
  const letterCount: { [name: string]: number } = {};

  template.forEach((x) => {
    if (!(x in letterCount)) {
      letterCount[x] = 0;
    }
    letterCount[x] += 1;
  });

  splitted[1].split("\n").forEach((d) => {
    const [pair, toInsert] = d.split(" -> ");
    lookup[pair] = toInsert;
  });

  let pairs: { [name: string]: number } = {};

  for (let i = 0; i < template.length - 1; i++) {
    const key = template[i] + template[i + 1];
    if (!(key in pairs)) {
      pairs[key] = 0;
    }
    pairs[key] += 1;
  }

  for (let i = 0; i < iterations; i++) {
    const newPairs: { [name: string]: number } = {};
    for (const kvp of Object.keys(pairs)) {
      const toInsert = lookup[kvp];
      const [first, second] = kvp.split("");
      const np1 = first + toInsert;
      const np2 = toInsert + second;

      if (!(np1 in newPairs)) {
        newPairs[np1] = 0;
      }
      if (!(np2 in newPairs)) {
        newPairs[np2] = 0;
      }

      newPairs[np1] += pairs[kvp];
      newPairs[np2] += pairs[kvp];

      if (!(toInsert in letterCount)) {
        letterCount[toInsert] = 0;
      }
      letterCount[toInsert] += pairs[kvp];
    }

    pairs = { ...newPairs };
  }

  const counts = Object.values(letterCount);
  counts.sort((x, y) => x - y);
  return counts[counts.length - 1] - counts[0];
};

export { calculate as calculateDay14 };
