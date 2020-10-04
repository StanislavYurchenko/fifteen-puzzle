import './styles/styles.scss';
import FifteenPuzzle from './js/FifteenPuzzle/FifteenPuzzle.js';
import Timer from './js/Timer/Timer.js';

const formRef = document.querySelector('.form');

const formHolder = event => {
  event.preventDefault();
  const { target } = event;
  const selectedTime = target.elements.time.value;
  console.log(selectedTime);
};

const fifteenPuzzle = new FifteenPuzzle('.puzzle');
// fifteenPuzzle.start();
const timer = new Timer('.timer', 1000 * 60 * 60);

formRef.addEventListener('submit', formHolder);
