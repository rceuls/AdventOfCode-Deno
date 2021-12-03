type State = {
  vertical: number;
  verticalAdjusted: number;
  horizontal: number;
  aim: number;
};

const doMove = (state: State, move: string) => {
  switch (move[0]) {
    case "d": {
      const amount = +move.slice(5);
      state.vertical += amount;
      state.aim += amount;
      break;
    }
    case "u": {
      const amount = +move.slice(3);
      state.vertical -= amount;
      state.aim -= amount;
      break;
    }
    case "f": {
      const amount = +move.slice(7);
      state.horizontal += amount;
      state.verticalAdjusted += amount * state.aim;
      break;
    }
  }
  return state;
};

const calculate = (input: string[]) => {
  const finalPosition = input.reduce(doMove, {
    vertical: 0,
    verticalAdjusted: 0,
    aim: 0,
    horizontal: 0,
  });

  return {
    regular: finalPosition.vertical * finalPosition.horizontal,
    adjusted: finalPosition.verticalAdjusted * finalPosition.horizontal,
  };
};

export { calculate };
