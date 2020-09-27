import './styles/styles.scss';


const puzzleRef = document.querySelector('.puzzle');
const squareRef = puzzleRef.querySelectorAll('.square');


const gameState = [
  [ 1, 2, 3, 4],
  [ 5, 6, 7, 8],
  [ 9,10,11,12],
  [13,14,15, 0],
]
console.log(gameState);

const findIndexElement = numberToMove => {
  return gameState.reduce((acc, row, rowIndex) =>{
    if (row.indexOf(numberToMove) === -1) return acc
    return {...acc, ...{rowIndex:rowIndex, colIndex:row.indexOf(numberToMove)}}
  }, {})
}

const findDirectionOfMove = (indexToMove, indexZero) => {
  if(indexToMove.rowIndex === indexZero.rowIndex - 1 && indexToMove.colIndex === indexZero.colIndex) return 'toDown'
  if(indexToMove.rowIndex === indexZero.rowIndex + 1 && indexToMove.colIndex === indexZero.colIndex) return 'toUp'
  if(indexToMove.rowIndex === indexZero.rowIndex && indexToMove.colIndex === indexZero.colIndex -1 ) return 'toRight'
  if(indexToMove.rowIndex === indexZero.rowIndex && indexToMove.colIndex === indexZero.colIndex +1 ) return 'toLeft'
  return 'impossible'
}

const changePosition = (direction, indexToMove, indexZero) => {
  if (direction === 'toDown' || direction === 'toUp'){
    gameState[indexZero.rowIndex][indexZero.colIndex]=gameState[indexToMove.rowIndex][indexToMove.colIndex];
    gameState[indexToMove.rowIndex][indexToMove.colIndex] = 0;
  }
  if (direction === 'toRight' || direction === 'toLeft'){
    gameState[indexZero.rowIndex][indexZero.colIndex]=gameState[indexToMove.rowIndex][indexToMove.colIndex];
    gameState[indexToMove.rowIndex][indexToMove.colIndex] = 0;
  }
}

const puzzleHolder = (event) => {
  const { target , currentTarget } = event;
  if (currentTarget === target || target.dataset.number === '0') return
  const numberRequestToMove = +target.dataset.number;
  console.log('numberRequestToMove',numberRequestToMove);
  const indexToMove = findIndexElement(numberRequestToMove);
  console.log('indexToMove',indexToMove);
  const indexZero = findIndexElement(0)
  console.log('indexZero',indexZero);
  const directionOfMove = findDirectionOfMove(indexToMove,indexZero)
  console.log('directionOfMove',directionOfMove);
  changePosition(directionOfMove, indexToMove, indexZero)
  console.log(gameState);

}

puzzleRef.addEventListener('click', puzzleHolder)
