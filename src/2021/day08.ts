type Line = {
  leadUp: string[][];
  result: string[];
  res: string[];
};

const parseInput: (input: string) => Line = (input: string) => {
  const fpSp = input.split(" | ");
  return {
    leadUp: fpSp[0]
      .split(" ")
      .map((x) => x.split("").sort((x, y) => x.localeCompare(y))) as string[][],
    result: fpSp[1].split(" ").map((x) =>
      x
        .split("")
        .sort((x, y) => x.localeCompare(y))
        .join("")
    ) as string[],
    res: new Array(fpSp[1].split(" ").length).fill("") as string[],
    numberParts: new Array(10).fill(new Set<string>()) as Set<string>[],
  };
};

const extractNumber = (input: Line) => {
  const leads = Array.from(new Set(input.leadUp));
  const elementals: string[][] = new Array(9);
  elementals[1] = leads.find((x) => x.length === 2) ?? [];
  elementals[4] = leads.find((x) => x.length === 4) ?? [];
  elementals[7] = leads.find((x) => x.length === 3) ?? [];
  elementals[8] = leads.find((x) => x.length === 7) ?? [];
  elementals[3] =
    leads.find(
      (x) =>
        x.length === 5 &&
        x.filter((e) => !elementals[7].includes(e)).length === 2
    ) ?? [];
  elementals[5] =
    leads.find(
      (x) =>
        x.length === 5 &&
        x !== elementals[3] &&
        x.filter((e) => !elementals[4].includes(e)).length === 2
    ) ?? [];
  elementals[2] =
    leads.find(
      (x) => x.length === 5 && x !== elementals[3] && x !== elementals[5]
    ) ?? [];
  elementals[6] =
    leads.find(
      (x) =>
        x.length === 6 &&
        x.filter((e) => !elementals[1].includes(e)).length === 5
    ) ?? [];

  elementals[9] =
    leads.find(
      (x) =>
        x.length == 6 &&
        elementals[6] !== x &&
        x.filter((e) => !elementals[4].includes(e)).length === 2
    ) ?? [];

  elementals[0] =
    leads.find(
      (x) => x.length === 6 && elementals[9] !== x && elementals[6] !== x
    ) ?? [];

  const numbers: string[] = [];
  const flattenedElements = elementals.map((x) => x.join(""));
  for (let i = 0; i < input.result.length; i++) {
    numbers.push(flattenedElements.indexOf(input.result[i]).toString());
  }
  return +numbers.join("");
};

const calculatePartTwo = async (input: string[]) => {
  const underReview = input.map(parseInput);
  const allNumbers: Promise<number>[] = [];
  for (let i = 0; i < underReview.length; i++) {
    const currentLine = underReview[i];
    allNumbers.push(
      new Promise((resolve) => resolve(extractNumber(currentLine)))
    );
  }
  return (await Promise.all(allNumbers)).reduce((p, n) => p + n);
};

const calculate = (input: string[]) => {
  const parsedInput = input.map(parseInput);

  let total = 0;
  for (let i = 0; i < parsedInput.length; i++) {
    for (let j = 0; j < parsedInput[i].result.length; j++) {
      const resLength = parsedInput[i].result[j].length;
      if (
        resLength === 2 ||
        resLength === 4 ||
        resLength === 3 ||
        resLength === 7
      ) {
        total += 1;
      }
    }
  }
  return total;
};

export {
  calculate as calculateDay08Part01,
  calculatePartTwo as calculateDay08Part02,
};
