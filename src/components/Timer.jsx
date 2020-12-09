import React, { useEffect, useState } from "react";
// import moment from "moment";
import { connect } from "react-redux";
import * as timerActions from "./timer.actions";


const Timer = ({ id, name, deleteTimer }) => {

  const [isRunning, setIsRunning] = useState(true);
  const [seconds, setSeconds] = useState(0);

  // let time = moment().hour(0).minute(0).second(seconds).format('HH:mm:ss');

  useEffect(() => {
    if (isRunning) {
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

  // useEffect(() => {
  //   const dataTimer = {
  //     id,
  //     name,
  //     seconds,
  //     isRunning,
  //   };
  //   window.addEventListener('beforeunload', () => {

  //     localStorage.setItem(id, JSON.stringify(dataTimer))
  //   }, false)
  // })

  // useEffect(() => {
  //   const dataTimer = {
  //     id,
  //     name,
  //     seconds,
  //     isRunning,
  //   };
  //   localStorage.setItem(id, JSON.stringify(dataTimer))
  // })



  // debugger;
  return (
    <div className={`timer ${isRunning ? 'colortimer' : ''}`} >
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
              onClick={() => setIsRunning(false)}
            ><i className="material-icons md-24">pause_circle_outline</i></button>)
          : (
            <button className="timer__playpause-btn"
              onClick={() => setIsRunning(true)}
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
}

const ConnectedTimer = connect(null, mapDispatch)(Timer);
export default ConnectedTimer;