import React, { useState } from "react";
import moment from "moment";
import { connect } from "react-redux";
import Timer from "./Timer";
import * as trackerActions from "./tracker.actions";


const Tracker = ({ tracks, createLap }) => {

  const [value, setValue] = useState('');

  const onTimerStart = () => {
    const id = Date.now();
    const newLap = {
      id,
      name: `${value ? value : moment().format('YYYY-MM-DD')}`,
    }
    createLap(newLap);
    setValue('');
  }


  return (
    <div>
      <div className="tracker">
        <input className="tracker__input"
          value={value}
          placeholder='Enter tracker name'
          type="text"
          onChange={e => setValue(e.target.value)}
        />
        <button className="tracker__create-btn"
          onClick={onTimerStart}
        >B</button>
      </div>
      <div className="tracker__list">
        {tracks.map(track => (
          <Timer key={track.id} {...track} />
        ))}
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