import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as timerActions from "./timer.actions";


const Timer = ({ id, name, deleteTimer, updateTimer, timers }) => {

  const actualData = id => timers.filter(timer => timer.id === id);

  const transformSeconds = actualData(id)[0].isRunning === 1
    ? Date.now() - actualData(id)[0].id + actualData(id)[0].seconds
    : actualData(id)[0].seconds;

  const [isRunning, setIsRunning] = useState(actualData(id)[0].isRunning && 1);
  const [seconds, setSeconds] = useState(Math.floor(transformSeconds / 1000) || 0);


  useEffect(() => {
    if (isRunning === 1) {
      const idTimer = window.setInterval(() => {
        setSeconds(seconds => seconds + 1)
      }, 1000);
      return () => window.clearInterval(idTimer);
    } return undefined;
  }, [isRunning]);

  // debugger;
  const ss = `${(seconds % 60)}`.slice(-2);
  const minutes = `${Math.floor(seconds / 60)}`;
  const mm = `${minutes % 60}`.slice(-2);
  const hh = `${Math.floor(seconds / 3600)}`.slice(-2);

  let time = (hh < 10 ? '0' + hh : hh) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (ss < 10 ? '0' + ss : ss);

  useEffect(() => {
    const updateData = {
      id,
      name,
      seconds,
      isRunning,
    };
    updateTimer(updateData);
  }, [seconds, isRunning])

  // debugger;
  return (
    <div className={`timer ${isRunning !== 0 ? 'colortimer' : ''}`} >
      <div className="timer__name">
        {name}
      </div>
      <div className="timer__time">
        {time}
      </div>
      <div className="timer__buttons">
        {isRunning
          ? (
            <button className="timer__playpause-btn"
              onClick={() => setIsRunning(0)}
            ><i className="material-icons md-24">pause_circle_outline</i></button>)
          : (
            <button className="timer__playpause-btn"
              onClick={() => setIsRunning(1)}
            ><i className="material-icons md-24">play_circle_outline</i></button>
          )
        }
        <button className="timer__delete-btn"
          onClick={() => deleteTimer(id)}
        ><i className="material-icons md-24">delete_outline</i></button>
      </div>
    </div>
  )
};

const mapDispatch = {
  deleteTimer: timerActions.deleteTimer,
  updateTimer: timerActions.updateTimer,
}

const mapState = state => {
  return {
    timers: state.timers.timersList,
  }
}

const ConnectedTimer = connect(mapState, mapDispatch)(Timer);
export default ConnectedTimer;