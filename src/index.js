import './styles/styles.scss';
import FifteenPuzzle from './js/FifteenPuzzle/FifteenPuzzle.js';
import CountdownTimer from './js/Timer/Timer.js';

const fifteenPuzzle = new FifteenPuzzle('.puzzle');

const newGame = () =>   fifteenPuzzle.start();

const timer = new CountdownTimer('.timer', newGame);

