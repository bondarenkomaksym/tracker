import React, { useState, useEffect } from "react";
import moment from "moment";
import { connect } from "react-redux";
import * as trackerActions from "./tracker.actions";

const Tracker = ({ tracks, createLap, deleteLap }) => {

  const [value, setValue] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);

  let time = moment().hour(0).minute(0).second(seconds).format('HH : mm : ss');

  useEffect(() => {
    if (isRunning) {
      const idTimer = window.setInterval(() => {
        setSeconds(seconds => seconds + 1)
      }, 1000);
      return () => window.clearInterval(idTimer);
    } return undefined;
  }, [isRunning]);

  const onTimerStart = () => {
    setIsRunning(true);
    const id = Date.now();
    const newLap = {
      id,
      name: `${value ? value : moment().format('YYYY-MM-DD')}`,
    }
    createLap(newLap);
    setValue('');
  }

  return (
    <div className="tracker">
      <input
        value={value}
        placeholder='Enter tracker name'
        type="text"
        onChange={e => setValue(e.target.value)}
      />
      <button onClick={onTimerStart}>Create</button>
      <div>
        <div >
          {tracks.map(track =>
            <div key={track.id}>
              <div> {track.name + " " + time}</div>

              <button onClick={() => setIsRunning(false)}
              >Pause</button>

              <button onClick={() => setIsRunning(true)}
              >Play</button>


              <button onClick={() => deleteLap(track.id)}
              >-</button>
            </div>
          )
          }

        </div>
      </div>
    </div>
  )
};


const mapDispatch = {
  createLap: trackerActions.addLap,
  deleteLap: trackerActions.deleteLap,
}

const mapState = state => {
  return {
    tracks: state.tracks.tracksList,
  }
}

const ConnectedTracker = connect(mapState, mapDispatch)(Tracker);
export default ConnectedTracker;