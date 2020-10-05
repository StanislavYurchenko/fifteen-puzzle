export default class FifteenPuzzle {
  constructor(selector) {
    this._puzzleRef = document.querySelector(selector);
    this._victory = false;
    this._gameState = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 0],
    ];
    this._indexZero = null;
    this._indexToMove = null;
    this._directionOfMove = null;
    this._numberRequestToMove = null;
    this._mixedArray = null;
    this._puzzleRef.addEventListener('click', this._puzzleHolder.bind(this));
    this._init();
  }

  isWin() {
    return !this._gameState.flat().some((item, i) => item > 0 && item - 1 !== i);
  }
  _markup() {
    const list = document.createElement('ul');
    list.classList.add('square__list');
    this._gameState.forEach((row, indexRow) => {
      row.forEach((square, indexColumn) => {
        const squareItem = document.createElement('li');
        squareItem.classList.add('square__item');
        squareItem.classList.add(`square-${indexRow * 4 + indexColumn}`);
        squareItem.setAttribute('data-number', `${indexRow * 4 + indexColumn}`);
        squareItem.textContent = `${indexRow * 4 + indexColumn}`;
        list.appendChild(squareItem);
      });
    });
    const winBanner = document.createElement('div');
    winBanner.classList.add('win-banner');
    winBanner.innerHTML = `<span>Congratulations!</span><span class="br">You won</span>`;

    this._puzzleRef.appendChild(list);
    this._puzzleRef.appendChild(winBanner);
  }
  _arrangeGameState() {
    this._gameState.forEach((row, indexRow) => {
      row.forEach((square, indexColumn) => {
        const squareRefs = Array.from(this._puzzleRef.querySelectorAll('.square__item'));
        const squareRef = squareRefs.find(
          el => el.dataset.number === `${this._gameState[indexRow][indexColumn]}`,
        );
        squareRef.style.transform = `translate(${indexColumn * 100}%, ${indexRow * 100}%)`;
      });
    });
  }
  _findIndexElement(numberToMove) {
    return this._gameState.reduce((acc, row, rowIndex) => {
      if (row.indexOf(numberToMove) === -1) return acc;
      return {
        ...acc,
        ...{ rowIndex: rowIndex, colIndex: row.indexOf(numberToMove) },
      };
    }, {});
  }
  _findDirectionOfMove() {
    if (
      this._indexToMove.rowIndex === this._indexZero.rowIndex - 1 &&
      this._indexToMove.colIndex === this._indexZero.colIndex
    )
      return 'toDown';
    if (
      this._indexToMove.rowIndex === this._indexZero.rowIndex + 1 &&
      this._indexToMove.colIndex === this._indexZero.colIndex
    )
      return 'toUp';
    if (
      this._indexToMove.rowIndex === this._indexZero.rowIndex &&
      this._indexToMove.colIndex === this._indexZero.colIndex - 1
    )
      return 'toRight';
    if (
      this._indexToMove.rowIndex === this._indexZero.rowIndex &&
      this._indexToMove.colIndex === this._indexZero.colIndex + 1
    )
      return 'toLeft';
    return 'impossible';
  }
  _changePosition() {
    if (this._directionOfMove === 'toDown' || this._directionOfMove === 'toUp') {
      this._gameState[this._indexZero.rowIndex][this._indexZero.colIndex] = this._gameState[
        this._indexToMove.rowIndex
      ][this._indexToMove.colIndex];
      this._gameState[this._indexToMove.rowIndex][this._indexToMove.colIndex] = 0;
    }
    if (this._directionOfMove === 'toRight' || this._directionOfMove === 'toLeft') {
      this._gameState[this._indexZero.rowIndex][this._indexZero.colIndex] = this._gameState[
        this._indexToMove.rowIndex
      ][this._indexToMove.colIndex];
      this._gameState[this._indexToMove.rowIndex][this._indexToMove.colIndex] = 0;
    }
  }
  _showWinnerBanner() {
    if (this._victory) {
      this._puzzleRef.querySelector('.win-banner').style.display = 'block';
    }
  }
  _puzzleHolder(event) {
    if (this._victory) return;
    const { target, currentTarget } = event;
    if (currentTarget === target || target.dataset.number === '0') return;
    this._numberRequestToMove = +target.dataset.number;
    this._indexToMove = this._findIndexElement(this._numberRequestToMove);
    this._indexZero = this._findIndexElement(0);
    this._directionOfMove = this._findDirectionOfMove();

    this._changePosition();
    this._arrangeGameState();
    this._victory = this.isWin();
    this._showWinnerBanner();
  }
  _mixArray(arr) {
    let j = 0;
    let temp = 0;
    for (let i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    if (!this._isArraySolvable(arr)) {
      this._mixArray(arr);
    }
    return arr;
  }
  _newGameState() {
    let index = 1;
    const array = Array.from({ length: 15 }, () => index++);
    this._mixedArray = this._mixArray(array);
    return this._gameState.map((row, indexRow) => {
      return [
        ...row.map((el, indexColumn) => {
          if (indexRow === 3 && indexColumn === 3) return 0;
          return this._mixedArray[indexRow * 4 + indexColumn];
        }),
      ];
    });
  }
  _isArraySolvable(arr) {
    const checkArray = [...arr, 0];
    let sum = 0;
    for (let i = 1; i < checkArray.length - 1; i++)
      for (let j = i - 1; j >= 0; j--) if (checkArray[j] > checkArray[i]) sum++;
    return !(sum % 2);
  }
  _init() {
    this._markup();
    this._arrangeGameState();
  }
  start() {
    this._gameState = this._newGameState();
    this._arrangeGameState();
  }
}
