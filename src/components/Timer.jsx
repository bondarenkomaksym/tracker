import React, { useEffect, useState } from "react";
// import moment from "moment";
import { connect } from "react-redux";
import * as timerActions from "./timer.actions";


const Timer = ({ id, name, deleteTimer, updateTimer, timers }) => {
  // debugger;
  const actualTimer = id => timers.filter(timer => timer.id === id);
  const actualStatus = id => timers.filter(timer => timer.id === id);
  // console.log(actualStatus(id)[0].isRunning);
  const [isRunning, setIsRunning] = useState(actualStatus(id)[0].isRunning || 1);
  const [seconds, setSeconds] = useState(actualTimer(id)[0].seconds || 0);

  // let time = moment().hour(0).minute(0).second(seconds).format('HH:mm:ss');

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
  // debugger;
  return {
    timers: state.timers.timersList,
  }
}

const ConnectedTimer = connect(mapState, mapDispatch)(Timer);
export default ConnectedTimer;