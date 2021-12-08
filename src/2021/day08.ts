const I0 = { d: 0, segments: 6 };
const I1 = { d: 1, segments: 2 };
const I2 = { d: 2, segments: 5 };
const I3 = { d: 3, segments: 5 };
const I4 = { d: 4, segments: 4 };
const I5 = { d: 5, segments: 5 };
const I6 = { d: 6, segments: 6 };
const I7 = { d: 7, segments: 3 };
const I8 = { d: 8, segments: 7 };
const I9 = { d: 9, segments: 6 };

type Line = {
  leadUp: string[][];
  result: string[];
  res: string[];
  numberParts: Set<string>[];
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

const calculatePartTwo = (input: string[]) => {
  const underReview = input.map(parseInput);
  let allNumbers = 0;
  for (let i = 0; i < underReview.length; i++) {
    const currentLine = underReview[i];
    const leads = currentLine.leadUp;
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
    for (let i = 0; i < currentLine.result.length; i++) {
      numbers.push(flattenedElements.indexOf(currentLine.result[i]).toString());
    }
    allNumbers += +numbers.join("");
  }
  return allNumbers;
};

const calculate = (input: string[]) => {
  const parsedInput = input.map(parseInput);

  let total = 0;
  for (let i = 0; i < parsedInput.length; i++) {
    for (let j = 0; j < parsedInput[i].result.length; j++) {
      const resLength = parsedInput[i].result[j].length;
      if (
        resLength === I1.segments ||
        resLength === I4.segments ||
        resLength === I7.segments ||
        resLength === I8.segments
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
