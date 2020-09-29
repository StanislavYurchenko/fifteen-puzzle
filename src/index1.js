import './styles/styles.scss';

const puzzleRef = document.querySelector('.puzzle');
const squareRefs = Array.from(puzzleRef.querySelectorAll('.square'));
const winBannerRef = puzzleRef.querySelector('.win-banner');

let gameState = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 0],
];

let victory = false;

const markupGameState = state => {
  state.forEach((row, indexRow) => {
    row.forEach((square, indexColumn) => {
      const squareRef = squareRefs.find(
        el => el.dataset.number === `${state[indexRow][indexColumn]}`,
      );
      squareRef.style.transform = `translate(${indexColumn * 100}%, ${
        indexRow * 100
      }%)`;
    });
  });
};

const findIndexElement = (numberToMove, state) => {
  return state.reduce((acc, row, rowIndex) => {
    if (row.indexOf(numberToMove) === -1) return acc;
    return {
      ...acc,
      ...{ rowIndex: rowIndex, colIndex: row.indexOf(numberToMove) },
    };
  }, {});
};

const findDirectionOfMove = (indexToMove, indexZero) => {
  if (
    indexToMove.rowIndex === indexZero.rowIndex - 1 &&
    indexToMove.colIndex === indexZero.colIndex
  )
    return 'toDown';
  if (
    indexToMove.rowIndex === indexZero.rowIndex + 1 &&
    indexToMove.colIndex === indexZero.colIndex
  )
    return 'toUp';
  if (
    indexToMove.rowIndex === indexZero.rowIndex &&
    indexToMove.colIndex === indexZero.colIndex - 1
  )
    return 'toRight';
  if (
    indexToMove.rowIndex === indexZero.rowIndex &&
    indexToMove.colIndex === indexZero.colIndex + 1
  )
    return 'toLeft';
  return 'impossible';
};

const changePosition = (direction, indexToMove, indexZero, state) => {
  if (direction === 'toDown' || direction === 'toUp') {
    state[indexZero.rowIndex][indexZero.colIndex] =
      state[indexToMove.rowIndex][indexToMove.colIndex];
    state[indexToMove.rowIndex][indexToMove.colIndex] = 0;
  }
  if (direction === 'toRight' || direction === 'toLeft') {
    state[indexZero.rowIndex][indexZero.colIndex] =
      state[indexToMove.rowIndex][indexToMove.colIndex];
    state[indexToMove.rowIndex][indexToMove.colIndex] = 0;
  }
};

const isWin = state => {
  return !state.flat().some((item, i) => item > 0 && item - 1 !== i);
};

const showWinnerBanner = () => {
  if (victory) {
    winBannerRef.style.display = 'block';
  }
};

const puzzleHolder = event => {
  if (victory) return;
  const { target, currentTarget } = event;
  if (currentTarget === target || target.dataset.number === '0') return;
  const numberRequestToMove = +target.dataset.number;
  const indexToMove = findIndexElement(numberRequestToMove, gameState);
  const indexZero = findIndexElement(0, gameState);
  const directionOfMove = findDirectionOfMove(indexToMove, indexZero);

  changePosition(directionOfMove, indexToMove, indexZero, gameState);
  markupGameState(gameState);
  victory = isWin(gameState);
  showWinnerBanner();
};

const newGameState = () => {
  let max = 15;
  let index = 1;
  const array = Array.from({ length: max }, () => index++);

  const mixArray = arr => {
    let j, temp;
    for (let i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    if (!isArraySolvable(arr)) {
      mixArray(arr);
    }
    return arr;
  };

  const mixedArray = mixArray(array);

  return gameState.map((row, indexRow) => {
    return [
      ...row.map((el, indexColumn) => {
        if (indexRow === 3 && indexColumn === 3) return 0;
        return mixedArray[indexRow * 4 + indexColumn];
      }),
    ];
  });
};

const isArraySolvable = arr => {
  let sum = 0;
  for (let i = 1; i < arr.length - 1; i++)
    for (let j = i - 1; j >= 0; j--) if (arr[j] > arr[i]) sum++;
  return !(sum % 2);
};

const init = () => {
  gameState = newGameState();
  markupGameState(gameState);
};

init();
puzzleRef.addEventListener('click', puzzleHolder);
