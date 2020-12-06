import React, { useEffect, useState } from "react";
// import moment from "moment";
import { connect } from "react-redux";
import * as trackerActions from "./tracker.actions";


const Timer = ({ id, name, deleteLap }) => {

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


  const ss = `${(seconds % 60)}`.slice(-2);
  const minutes = `${Math.floor(seconds / 60)}`;
  const mm = `${minutes % 60}`.slice(-2);
  const hh = `${Math.floor(seconds / 3600)}`.slice(-2);

  let time = (hh < 10 ? '0' + hh : hh) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (ss < 10 ? '0' + ss : ss);

  // debugger;
  return (
    <div className="tracker__list-item">
      <div className="tracker__list">
        <div className="tracker__name">
          {name}
        </div>
        <div className="tracker__time">
          {time}
        </div>
        <div className="tracker__buttons">
          {isRunning
            ? (
              <button className="tracker__playpause-btn"
                onClick={() => setIsRunning(false)}
              ><i className="material-icons md-48">pause_circle_outline</i></button>)
            : (
              <button className="tracker__playpause-btn"
                onClick={() => setIsRunning(true)}
              ><i className="material-icons md-48">play_circle_outline</i></button>
            )
          }
          <button className="tracker__delete-btn"
            onClick={() => deleteLap(id)}
          ><i className="material-icons md-48">remove_circle</i></button>
        </div>
      </div>
    </div>
  )
};

const mapDispatch = {
  createLap: trackerActions.addLap,
  deleteLap: trackerActions.deleteLap,
}

const ConnectedTimer = connect(null, mapDispatch)(Timer);
export default ConnectedTimer;