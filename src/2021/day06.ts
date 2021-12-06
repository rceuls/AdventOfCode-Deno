const calculate = (input: string, iterations: number) => {
  const initialFishesRaw = input.split(",").map((x) => +x);
  const counter: number[] = new Array(9).fill(0);

  for (let i = 0; i < initialFishesRaw.length; i++) {
    const value = initialFishesRaw[i];
    counter[value] += 1;
  }

  for (let i = 0; i < iterations; i++) {
    const previous = [...counter];

    for (let c = 1; c < 9; c++) {
      counter[c - 1] = previous[c];
    }
    counter[8] = previous[0];
    counter[6] = previous[7] + previous[0];
  }

  return counter.reduce((p, n) => p + n, 0);
};

export { calculate as calculateDay06 };
