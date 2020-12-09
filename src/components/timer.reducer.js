import { ADD_TIMER, DELETE_TIMER } from './timer.actions';

// const localState = () => Object.values(localStorage)
//   .filter(element => element.includes('seconds'))
//   .map(value => JSON.parse(value));
// let data = timers.concat(localState());

const initialState = {
  timersList: [],
}

const timerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TIMER: {
      return {
        ...state,
        timersList: state.timersList
          .concat(action.payload.timerData)
      };
    }
    case DELETE_TIMER: {
      const newList = state.timersList.filter(timer => timer.id !== action.payload.timerId);
      localStorage.removeItem(action.payload.timerId);
      return {
        ...state,
        timersList: newList,
      };
    }
    default:
      return state;
  }
};

export default timerReducer;