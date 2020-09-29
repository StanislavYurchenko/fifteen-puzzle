export default class Timer {
  constructor(selector, targetDate) {
    this._selector = selector;
    this._targetDate = new Date(targetDate);

    this._ref = {
      days: document.querySelector(`${this._selector} span[data-value = days]`),
      hours: document.querySelector(
        `${this._selector} span[data-value = hours]`,
      ),
      mins: document.querySelector(`${this._selector} span[data-value = mins]`),
      secs: document.querySelector(`${this._selector} span[data-value = secs]`),
    };

    this._intervalId = null;

    this.start();
  }

  _getTimeNow() {
    return new Date();
  }

  _getTimeLeft() {
    const delta = this._targetDate.getTime() - this._getTimeNow();
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

  _render() {
    this._ref.days.textContent = this._getDaysLeft();
    this._ref.hours.textContent = this._getHoursLeft();
    this._ref.mins.textContent = this._getMinsLeft();
    this._ref.secs.textContent = this._getSecsLeft();
  }

  start() {
    this._intervalId = setInterval(() => {
      this._render();
    }, 1000);
  }

  stop() {
    clearInterval(this._interval);
  }
}

const timer1 = new CountdownTimer('#timer-1', 'Jan 10, 2021 00:00:00');
