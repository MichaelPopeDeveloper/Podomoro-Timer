import React, { Component } from 'react';
import { Button } from 'antd';
import "antd/dist/antd.css"

const twentyFiveMinutesInSeconds = 60 * 25;

class Main extends Component {
  constructor() {
    super();
    this.state = {
      minutes: 25,
      seconds: 0,
      placeHolderZero: 0,
      totalSecondsRemaining: twentyFiveMinutesInSeconds,
      timerHasStarted: false,
      workTimer: true,
      shortBreak: false,
      longBreak: false,
    };
    this.calculateMinutes = this.calculateMinutes.bind(this);
    this.calculateSeconds = this.calculateSeconds.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.invokeTime = this.invokeTime.bind(this);
    this.handlePlaceHolderZero = this.handlePlaceHolderZero.bind(this);
    this.workTimer = this.workTimer.bind(this);
    this.shortBreak = this.shortBreak.bind(this);
    this.longBreak = this.longBreak.bind(this);
  }

  calculateMinutes(totalSeconds) {
    const remainingMinutes = (seconds) => this.setState({ minutes: Math.floor(seconds / 60) });
    remainingMinutes(totalSeconds);
  }
  calculateSeconds(totalSeconds) {
    const remainingSeconds = (seconds) => this.setState({ seconds: Math.floor(seconds % 60) });
    console.log(totalSeconds);
    remainingSeconds(totalSeconds);
  }
  invokeTime() {
    this.setState({ totalSecondsRemaining: this.state.totalSecondsRemaining - 1 })
    this.calculateMinutes(this.state.totalSecondsRemaining);
    this.calculateSeconds(this.state.totalSecondsRemaining);
  }
  handlePlaceHolderZero() {
    if (Math.floor(this.state.totalSecondsRemaining % 60 < 10)) {
      this.setState({ placeHolderZero: 0 });
    } else {
      this.setState({ placeHolderZero: '' });
    }
  }
  workTimer(cb) {
    this.stopTimer();
    this.setState({ workTimer: true, shortBreak: false, longBreak: false, timerHasStarted: false, minutes: 25, seconds: 0, totalSecondsRemaining: twentyFiveMinutesInSeconds, placeHolderZero: 0 });
    clearInterval(cb);
  }

  shortBreak(cb) {
    this.stopTimer();
    this.setState({ workTimer: false, shortBreak: true, longBreak: false, timerHasStarted: false, minutes: 5, seconds: 0, totalSecondsRemaining: 60 * 5, placeHolderZero: 0 });
    clearInterval(cb);
  }

  longBreak(cb) {
    this.stopTimer();
    this.setState({ workTimer: false, shortBreak: false, longBreak: true, timerHasStarted: false, minutes: 15, seconds: 0, totalSecondsRemaining: 60 * 15, placeHolderZero: 0 });
    clearInterval(cb);
  }


  startTimer() {
    // (REFACTOR) Break this up into multiple functions
    if (this.state.timerHasStarted === false) {
      this.setState({ timerHasStarted: true });
      let tickInterval = setInterval(() => {
        if (this.state.totalSecondsRemaining !== 0) {
          this.invokeTime();
          this.handlePlaceHolderZero();
        }
        if (this.state.totalSecondsRemaining / 60 === 0 && this.state.totalSecondsRemaining % 60 === 0) {
          if (this.state.workTimer) {
            this.workTimer(tickInterval);
          }
          if (this.state.shortBreak) {
            this.shortBreak(tickInterval);
          }
          if (this.state.longBreak) {
            this.longBreak(tickInterval);
          }
        }
      }, 1000);
    }
  }

  stopTimer = () => {
    this.setState({ totalSecondsRemaining: 0 })
  }

  render() {
    let { minutes, seconds, placeHolderZero } = this.state;
    return (
      <div className="main-page">
        <h1 id="title">Podomoro Timer</h1>
        <div id="button-options">
          <Button className="" type="primary" onClick={this.workTimer}>Work Timer</Button>
          <Button className="" type="primary" onClick={this.shortBreak}>Short Break</Button>
          <Button className="" type="primary" onClick={this.longBreak}>Long Break</Button>
        </div>
        <h1>{minutes}:{placeHolderZero}{seconds}</h1>
        <Button className="" type="primary" onClick={this.startTimer}>Start Timer</Button>
        <Button className="" type="primary" onClick={this.stopTimer}>Reset Timer</Button>
      </div>
    );
  }
}


export default Main;