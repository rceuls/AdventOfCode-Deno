type Direction = "up" | "forward" | "down";

type MoveRecord = {
  direction: Direction;
  amount: number;
};

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

const parsePosition = (input: string) => {
  const splitted = input.split(" ");
  return { direction: splitted[0] as Direction, amount: +splitted[1] };
};

const parsePositions = (input: string[]) => input.map(parsePosition);

const doMove = (state: State, mv: MoveRecord) => {
  const newState = { ...state };
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

const calculate: (input: string[]) => { regular: number; adjusted: number } = (
  input
) => {
  const initialState: State = {
    adjusted: {
      position: { horizontal: 0, vertical: 0 },
      aim: 0,
    },
    regular: {
      position: { horizontal: 0, vertical: 0 },
    },
  };

  const finalPosition = parsePositions(input).reduce<State>(
    (state, move) => doMove(state, move),
    initialState
  );

  return {
    regular: calc(finalPosition.regular.position),
    adjusted: calc(finalPosition.adjusted.position),
  };
};
export { calculate };
