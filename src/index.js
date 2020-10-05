import './styles/styles.scss';
import FifteenPuzzle from './js/FifteenPuzzle/FifteenPuzzle.js';
import CountdownTimer from './js/Timer/Timer.js';

const fifteenPuzzle = new FifteenPuzzle('.puzzle', stopTimer);

function newGame() {
  fifteenPuzzle.start();
}
function stopTimer() {
  timer.stop();
}

const timer = new CountdownTimer('.timer', newGame);
