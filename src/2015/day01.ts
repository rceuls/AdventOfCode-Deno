const calculate = (input: string) => {
  const splitted = input.split("");
  return (
    splitted.filter((x) => x === "(").length -
    splitted.filter((x) => x === ")").length
  );
};

const calculateTwo = (input: string) => {
  const splitted = input.split("");
  let floor = 0;
  for (let i = 0; i < splitted.length; i++) {
    floor += splitted[i] === "(" ? 1 : -1;
    if (floor < 0) {
      return i + 1;
    }
  }
  return -1;
};

export {
  calculate as calculateDay01Part01,
  calculateTwo as calculateDay01Part02,
};
