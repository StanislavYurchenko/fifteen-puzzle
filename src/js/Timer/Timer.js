// Создайте таймер
// Таймер можно выставить на 10с/20с/30с. ( У вас должно быть 3 кнопки с данными значениями)
// У таймера должна быть возможность поставить на паузу, продолжить, сбросить, старт.
//  Изначально должно быть всего 2 кнопки - старт и сбросить,
// после старта таймера кнопка старта меняет состояние на пауза,
// после нажатия на паузу кнопка меняет состояние на продолжить,
// после нажатия на продолжить кнопка меняет состояние на пауза
// после нажатия на сбросить кнопка старта снова имеет сочтояние старт

import timerMarkup from './timerMarkup.hbs';



export default class CountdownTimer {
  constructor(selector, callback) {
    this._selector = document.querySelector(selector);
    this._callback = callback;
    this._intervalId = null;
    this._btnStatus = {
      start: 'start',
      stop: 'reset',
    };
    this._startTime = null;
    this._pauseTime = null;
    this._pauseStartTime = null;
    this._initRender();
    this._refs = {
      hours: this._selector.querySelector('.timer__time-left--hour-value'),
      mins: this._selector.querySelector('.timer__time-left--min-value'),
      secs: this._selector.querySelector('.timer__time-left--sec-value'),
      btnStart: this._selector.querySelector('.timer__btn--start'),
      btnStop: this._selector.querySelector('.timer__btn--stop'),
      form: this._selector.querySelector('.form')
    };
    this._deltaTargetTime = this._refs.form.elements.time.value * 1000 * 60;

    this._refs.btnStart.addEventListener('click', this.start.bind(this));
    this._refs.btnStop.addEventListener('click', this.stop.bind(this));
    this._refs.form.addEventListener('click', this._updateTargetTime.bind(this));
    this._render(true)
  }

  _updateTargetTime(){
    this._deltaTargetTime = this._refs.form.elements.time.value * 1000 * 60;
    this._render(true);
  }

  start() {
    if (this._btnStatus.start === 'start') {
      this._changeBtnSts('start', 'pause');
      this._start();
      this._refs.btnStop.disabled = false;
      return;
    }
    if (this._btnStatus.start === 'pause') {
      this._changeBtnSts('start', 'resume');
      this._pause();
      return;
    }
    if (this._btnStatus.start === 'resume') {
      this._changeBtnSts('start', 'pause');
      this._resume();
      return;
    }
  }

  stop() {
    this._changeBtnSts('start', 'start');
    this._stop();
    this._refs.btnStop.disabled = true;
    return;
  }

  _getTimeNow() {
    return Date.now();
  }

  getTimeLeft() {
    return this._deltaTargetTime + this._startTime - this._getTimeNow() + this._pauseTime;
  }

  _changeBtnSts(button, status) {
    this._btnStatus[button] = status;
  }

  _getRenderData(init = false) {
    const timeLeft = init ? this._deltaTargetTime : this.getTimeLeft();

    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      .toString()
      .padStart(2, '0');
    const mins = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
      .toString()
      .padStart(2, '0');
    const secs = Math.floor((timeLeft % (1000 * 60)) / 1000)
      .toString()
      .padStart(2, '0');

    if (hours < 0 || mins < 0 || secs < 0) this.stop();

    return {
      hourLeftValue: isNaN(hours) || hours < 0 ? '00' : hours,
      minLeftValue: isNaN(mins) || mins < 0 ? '00' : mins,
      secLeftValue: isNaN(secs) || secs < 0 ? '00' : secs,
      btnStartLabel: this._btnStatus.start,
      btnStopLabel: this._btnStatus.stop,
    };
  }

  _initRender() {
    const markup = timerMarkup(this._getRenderData(true));
    this._selector.innerHTML = markup;
  }

  _render(init) {
    const renderData = this._getRenderData(init);
    this._refs.hours.textContent = renderData.hourLeftValue;
    this._refs.mins.textContent = renderData.minLeftValue;
    this._refs.secs.textContent = renderData.secLeftValue;
    this._refs.btnStart.textContent = renderData.btnStartLabel;
    this._refs.btnStop.textContent = renderData.btnStopLabel;
  }

  _tick() {
    this._intervalId = setTimeout(() => {
      this._tick();
      this._render();
    }, 1000);
  }

  _start() {
    this._startTime = this._getTimeNow();
    this._render();
    this._tick();
    this._callback && this._callback();
  }

  _pause() {
    this._pauseStartTime = this._getTimeNow();
    this._render();
    clearTimeout(this._intervalId);
  }

  _resume() {
    this._pauseTime += this._getTimeNow() - this._pauseStartTime;
    this._render();
    this._tick();
  }

  _stop() {
    this._pauseTime = null;
    this._pauseStartTime = null;
    clearTimeout(this._intervalId);
    this._render(true);
  }
}
