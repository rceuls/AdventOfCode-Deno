const BOARD_SIZE = 5;

type Board = {
  items: { val: number; hit: boolean; x: number; y: number }[];
};

type Result = {
  called: number;
  unmarked: number;
  ix?: number;
};

const getBoardsAndInput: (input: string) => {
  input: number[];
  boards: Board[];
} = (input) => {
  const splitted = input.split("\n\n");
  const getBoard = (raw: string) => {
    const board: Board = { items: [] };
    const lines = raw.replace(" ", " ").split("\n");
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        board.items.push({
          hit: false,
          val: +lines[i].slice(0 + 3 * j, 3 + 3 * j).trim(),
          x: i,
          y: j,
        });
      }
    }
    return board;
  };

  return {
    input: splitted[0].split(",").map((x) => +x),
    boards: splitted.slice(1).map(getBoard),
  };
};

const winCalculator = (target: number, board: Board) => {
  let shouldCheck = false;
  for (let j = 0; j < board.items.length; j++) {
    if (board.items[j].val === target) {
      board.items[j].hit = true;
      shouldCheck = true;
    }
    if (shouldCheck) {
      for (let k = 0; k < BOARD_SIZE; k++) {
        const isWin =
          board.items.filter((x) => x.x === k && x.hit).length === BOARD_SIZE ||
          board.items.filter((x) => x.y === k && x.hit).length === BOARD_SIZE;
        if (isWin) {
          return {
            called: target,
            unmarked: board.items
              .filter((x) => !x.hit)
              .reduce((p, n) => p + n.val, 0),
          };
        }
      }
    }
  }
  return undefined;
};

const playGame = (data: { input: number[]; boards: Board[] }) => {
  for (let i = 0; i < data.input.length; i++) {
    const target = data.input[i];

    for (let m = 0; m < data.boards.length; m++) {
      const calculateWin = winCalculator(target, data.boards[m]);
      if (calculateWin) {
        return calculateWin;
      }
    }
  }
  return undefined;
};

const playGamePartTwo = (data: { input: number[]; boards: Board[] }) => {
  const winningBoards: Result[] = [];
  const winningIndexes: Set<number> = new Set();
  for (let i = 0; i < data.input.length; i++) {
    const target = data.input[i];

    for (let m = 0; m < data.boards.length; m++) {
      if (!winningIndexes.has(m)) {
        const board = data.boards[m];
        const result = winCalculator(target, board);
        if (result) {
          winningBoards.push({ ...result, ix: m + 1 });
          winningIndexes.add(m);
        }
      }
    }
  }
  return winningBoards ? winningBoards[winningBoards.length - 1] : undefined;
};

const calculate = (input: string) => {
  const data = getBoardsAndInput(input);
  const result = playGame(data);
  if (result === undefined) {
    throw new Error("Shouldn't be here");
  }
  return result.unmarked * result.called;
};

const calculateTwo = (input: string) => {
  const data = getBoardsAndInput(input);
  const result = playGamePartTwo(data);
  if (result === undefined) {
    throw new Error("Shouldn't be here");
  }
  return result.unmarked * result.called;
};

export { calculate, calculateTwo };
