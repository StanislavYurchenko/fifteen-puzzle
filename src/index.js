import './styles/styles.scss';

class FifteenPuzzle {
  constructor(reference) {
    this._puzzleRef = document.querySelector(`${reference}`);
    // this._squareRefs = Array.from(this._puzzleRef.querySelectorAll('.square'));
    this._winBannerRef = this._puzzleRef.querySelector('.win-banner');
    this._victory = false;
    this._gameState = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 0],
    ];
    this._puzzleRef.addEventListener('click', this._puzzleHolder.bind(this));
    this._init();
  }

  isWin() {
    return !this._gameState
      .flat()
      .some((item, i) => item > 0 && item - 1 !== i);
  }

  _markup(state) {
    const list = document.createElement('ul');
    list.classList.add('square__list');
    state.forEach((row, indexRow) => {
      row.forEach((square, indexColumn) => {
        const squareItem = document.createElement('li');
        squareItem.classList.add('square__item');
        squareItem.classList.add(`square-${indexRow * 4 + indexColumn}`);
        squareItem.setAttribute('data-number', `${indexRow * 4 + indexColumn}`);
        squareItem.textContent = `${indexRow * 4 + indexColumn}`;
        list.appendChild(squareItem);
      });
    });
    this._puzzleRef.appendChild(list);
  }
  _arrangeGameState(state) {
    state.forEach((row, indexRow) => {
      row.forEach((square, indexColumn) => {
        const squareRefs = Array.from(
          this._puzzleRef.querySelectorAll('.square__item'),
        );
        const squareRef = squareRefs.find(
          el => el.dataset.number === `${state[indexRow][indexColumn]}`,
        );
        squareRef.style.transform = `translate(${indexColumn * 100}%, ${
          indexRow * 100
        }%)`;
      });
    });
  }
  _findIndexElement(numberToMove, state) {
    return state.reduce((acc, row, rowIndex) => {
      if (row.indexOf(numberToMove) === -1) return acc;
      return {
        ...acc,
        ...{ rowIndex: rowIndex, colIndex: row.indexOf(numberToMove) },
      };
    }, {});
  }
  _findDirectionOfMove(indexToMove, indexZero) {
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
  }
  _changePosition(direction, indexToMove, indexZero, state) {
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
  }
  _showWinnerBanner() {
    if (this._victory) {
      this._winBannerRef.style.display = 'block';
    }
  }
  _puzzleHolder(event) {
    if (this._victory) return;
    const { target, currentTarget } = event;
    if (currentTarget === target || target.dataset.number === '0') return;
    const numberRequestToMove = +target.dataset.number;
    const indexToMove = this._findIndexElement(
      numberRequestToMove,
      this._gameState,
    );
    const indexZero = this._findIndexElement(0, this._gameState);
    const directionOfMove = this._findDirectionOfMove(indexToMove, indexZero);

    this._changePosition(
      directionOfMove,
      indexToMove,
      indexZero,
      this._gameState,
    );
    this._arrangeGameState(this._gameState);
    this._victory = this.isWin();
    this._showWinnerBanner();
  }
  _newGameState() {
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
      if (!this._isArraySolvable(arr)) {
        mixArray(arr);
      }
      return arr;
    };

    const mixedArray = mixArray(array);

    return this._gameState.map((row, indexRow) => {
      return [
        ...row.map((el, indexColumn) => {
          if (indexRow === 3 && indexColumn === 3) return 0;
          return mixedArray[indexRow * 4 + indexColumn];
        }),
      ];
    });
  }
  _isArraySolvable(arr) {
    let sum = 0;
    for (let i = 1; i < arr.length - 1; i++)
      for (let j = i - 1; j >= 0; j--) if (arr[j] > arr[i]) sum++;
    return !(sum % 2);
  }
  _init() {
    this._gameState = this._newGameState();
    this._markup(this._gameState);
    this._arrangeGameState(this._gameState);
  }
}

const fifteenPuzzle = new FifteenPuzzle('.puzzle-class');
