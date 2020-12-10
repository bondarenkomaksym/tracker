import React, { useState } from "react";
import moment from "moment";
import { connect } from "react-redux";
import Timer from "./Timer";
import * as timerActions from "./timer.actions";


const Tracker = ({ timers, createTimer }) => {

  const [value, setValue] = useState('');

  const onTimerStart = () => {

    const id = Date.now();
    const newTimer = {
      id,
      name: `${value ? value : moment().format('YYYY-MM-DD')}`,
      isRunning: 1,
    }
    createTimer(newTimer);
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
        {timers.sort((a, b) => b.id - a.id).map(timer => {
          if (timer !== undefined) {
            return <Timer key={timer.id} {...timer} />
          }
        })}
      </div>
    </div>
  )
};

const mapDispatch = {
  createTimer: timerActions.addTimer,
}

const mapState = state => {
  return {
    timers: state.timers.timersList,
  }
}

const ConnectedTracker = connect(mapState, mapDispatch)(Tracker);
export default ConnectedTracker;