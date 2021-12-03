const calculatePartOne = (input: string[]) => {
  const width = input[0].length;
  const length = input.length;

  const gamma = [];
  for (let i = 0; i < width; i++) {
    let oneCount = 0;
    let isOne = false;

    for (let j = 0; j < length; j++) {
      oneCount += input[j][i] === "1" ? 1 : 0;
      if (oneCount > length / 2) {
        isOne = true;
        break;
      }
    }
    gamma.push(isOne ? "1" : "0");
  }
  const epsilon = gamma.map((x) => (x === "1" ? "0" : "1"));
  return (
    Number.parseInt(gamma.join(""), 2) * Number.parseInt(epsilon.join(""), 2)
  );
};

const getToKeep = (
  zeroCount: number,
  oneCount: number,
  keepTheLesser: boolean
) => {
  if (oneCount === zeroCount) {
    return keepTheLesser ? "0" : "1";
  } else if (oneCount > zeroCount) {
    return keepTheLesser ? "0" : "1";
  } else {
    return keepTheLesser ? "1" : "0";
  }
};

const countOnes = (input: string[], column: number) =>
  input.filter((x) => x[column] === "1").length;

const filterOut = (input: string[], column: number, keepTheLesser: boolean) => {
  const oneCount = countOnes(input, column);
  const zeroCount = input.length - oneCount;
  const toKeep = getToKeep(zeroCount, oneCount, keepTheLesser);
  return input.filter((x) => x[column] === toKeep);
};

const calculatePartTwo = (input: string[]) => {
  const width = input[0].length;
  let filtered = [...input];
  let filteredMany = [...input];
  for (let j = 0; j < width; j++) {
    if (filtered.length > 1) {
      filtered = filterOut(filtered, j, false);
    }

    if (filteredMany.length > 1) {
      filteredMany = filterOut(filteredMany, j, true);
    }

    if (filteredMany.length === 1 && filtered.length === 1) {
      break;
    }
  }
  return Number.parseInt(filtered[0], 2) * Number.parseInt(filteredMany[0], 2);
};

export { calculatePartOne as calculate, calculatePartTwo as calculateTwo };
