import './styles/styles.scss';
import FifteenPuzzle from './js/FifteenPuzzle.js';
import Timer from './js/Timer.js';

const fifteenPuzzle = new FifteenPuzzle('.puzzle');
const timer = new Timer('.timer', Date.now() + 1000 * 60 * 60);

// timer.start();
