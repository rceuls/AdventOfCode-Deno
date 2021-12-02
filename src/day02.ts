type Position = {
  horizontal: number;
  vertical: number;
};

type State = {
  adjusted: {
    position: Position;
    aim: number;
  };
  regular: {
    position: Position;
  };
};

const doMove = (state: State, move: string) => {
  const newState = { ...state };
  const mv = { direction: move.split(" ")[0], amount: +move.split(" ")[1] };
  switch (mv.direction) {
    case "down":
      newState.regular.position.vertical += mv.amount;
      newState.adjusted.aim += mv.amount;
      break;
    case "up":
      newState.regular.position.vertical -= mv.amount;
      newState.adjusted.aim -= mv.amount;
      break;
    case "forward":
      newState.regular.position.horizontal += mv.amount;
      newState.adjusted.position.horizontal += mv.amount;
      newState.adjusted.position.vertical += mv.amount * newState.adjusted.aim;
      break;
  }
  return newState;
};

const calc = (inbound: Position): number =>
  inbound.horizontal * inbound.vertical;

const calculate = (input: string[]) => {
  const finalPosition = input.reduce<State>(doMove, {
    adjusted: {
      position: { horizontal: 0, vertical: 0 },
      aim: 0,
    },
    regular: {
      position: { horizontal: 0, vertical: 0 },
    },
  });

  return {
    regular: calc(finalPosition.regular.position),
    adjusted: calc(finalPosition.adjusted.position),
  };
};

export { calculate };
