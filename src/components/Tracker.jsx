import React, { useState } from "react";
import moment from "moment";
import { connect } from "react-redux";
import Timer from "./Timer";
import * as trackerActions from "./tracker.actions";


const Tracker = ({ tracks, createLap }) => {

  const [value, setValue] = useState('');

  // const allData = localData.length <= 0 ? tracks : localData;
  // debugger;
  const onTimerStart = () => {
    const id = Date.now();
    const newLap = {
      id,
      name: `${value ? value : moment().format('YYYY-MM-DD')}`,
    }
    createLap(newLap);
    setValue('');
  }

  const onEnterPress = (event) => {
    if (event.key === 'Enter') {
      onTimerStart();
    }
  }
  // debugger;
  return (
    <div className="tracker">
      <div className="header">tracker</div>
      <div className="tracker__form">
        <input className="tracker__input"
          value={value}
          maxLength="30"
          placeholder='Enter tracker name'
          type="text"
          onChange={e => setValue(e.target.value)}
          onKeyDown={onEnterPress}
        />
        <button className="tracker__create-btn"
          type="submit"
          onClick={onTimerStart}
        ><i className="material-icons md-48">play_circle_filled</i></button>
      </div>

      <div className="tracker__list">
        {tracks.sort((a, b) => b.id - a.id).map(track => {
          if (track !== undefined) {
            return <Timer key={track.id} {...track} />
          }
        })}
      </div>
    </div>
  )
};

const mapDispatch = {
  createLap: trackerActions.addLap,
}

const mapState = state => {
  return {
    tracks: state.tracks.tracksList,
  }
}

const ConnectedTracker = connect(mapState, mapDispatch)(Tracker);
export default ConnectedTracker;