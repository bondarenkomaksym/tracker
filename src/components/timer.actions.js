export const ADD_TIMER = 'TIMERS/ADD_TIMER';
export const DELETE_TIMER = 'TIMERS/DELETE_TIMER';

export const addTimer = (timerData) => {
  return {
    type: ADD_TIMER,
    payload: {
      timerData,
    }
  };
}


export const deleteTimer = (timerId) => {
  return {
    type: DELETE_TIMER,
    payload: {
      timerId
    }
  };
}
