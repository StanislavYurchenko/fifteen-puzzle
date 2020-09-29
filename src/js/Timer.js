// Создайте таймер
// Таймер можно выставить на 10с/20с/30с. ( У вас должно быть 3 кнопки с данными значениями)
// У таймера должна быть возможность поставить на паузу, продолжить, сбросить, старт.
//  Изначально должно быть всего 2 кнопки - старт и сбросить,
// после старта таймера кнопка старта меняет состояние на пауза,
// после нажатия на паузу кнопка меняет состояние на продолжить,
// после нажатия на продолжить кнопка меняет состояние на пауза
// после нажатия на сбросить кнопка старта снова имеет сочтояние старт

import timerMarkup from '../template/timerMarkup.hbs';

export default class CountdownTimer {
  constructor(selector, targetDate) {
    this._selector = document.querySelector(selector);
    this._targetDate = targetDate;
    this._intervalId = null;
    this._initRender();
    this._refs = {
      hours: this._selector.querySelector('.timer__time-left--hour-value'),
      mins: this._selector.querySelector('.timer__time-left--min-value'),
      secs: this._selector.querySelector('.timer__time-left--sec-value'),
      btnStart: this._selector.querySelector('.timer__btn--start'),
      btnStop: this._selector.querySelector('.timer__btn--stop'),
    };
    this._refs.btnStart.addEventListener(
      'click',
      this._btnStartHolder.bind(this),
    );
    this._refs.btnStop.addEventListener(
      'click',
      this._btnStopHolder.bind(this),
    );
  }

  _updateTargetData() {
    return new Date(this._targetDate);
  }

  _btnStartHolder() {
    console.log('start');
    this.start();
    this._refs.btnStop.disabled = false;
  }

  _btnStopHolder() {
    console.log('stop');
    this.stop();
    this._refs.btnStop.disabled = true;
  }

  _getTimeNow() {
    return new Date();
  }

  _getTimeLeft() {
    const delta = this._updateTargetData().getTime() - this._getTimeNow();
    if (delta <= 0) {
      this.stop();
    }
    return delta;
  }

  _getDaysLeft() {
    return Math.floor(this._getTimeLeft() / (1000 * 60 * 60 * 24))
      .toString()
      .padStart(2, '0');
  }

  _getHoursLeft() {
    return Math.floor(
      (this._getTimeLeft() % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    )
      .toString()
      .padStart(2, '0');
  }

  _getMinsLeft() {
    return Math.floor((this._getTimeLeft() % (1000 * 60 * 60)) / (1000 * 60))
      .toString()
      .padStart(2, '0');
  }

  _getSecsLeft() {
    return Math.floor((this._getTimeLeft() % (1000 * 60)) / 1000)
      .toString()
      .padStart(2, '0');
  }

  _getRenderData() {
    return {
      hourLeftValue: this._getHoursLeft(),
      minLeftValue: this._getMinsLeft(),
      secLeftValue: this._getSecsLeft(),
      btnStartLabel: 'start',
      btnStopLabel: 'stop',
    };
  }

  _initRender() {
    const markup = timerMarkup(this._getRenderData());
    this._selector.innerHTML = markup;
  }

  _render() {
    const renderData = this._getRenderData();

    this._refs.hours.textContent = renderData.hourLeftValue;
    this._refs.mins.textContent = renderData.minLeftValue;
    this._refs.secs.textContent = renderData.secLeftValue;
  }

  start() {
    this._intervalId = setInterval(() => {
      this._render();
    }, 1000);
  }

  stop() {
    clearInterval(this._intervalId);
  }
}
