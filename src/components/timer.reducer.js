import { ADD_TIMER, DELETE_TIMER, UPDATE_TIMER } from './timer.actions';


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
    case UPDATE_TIMER: {
      const copy = JSON.parse(JSON.stringify(state.timersList));
      const updatedList = copy.map(el => {
        if (el.id === action.payload.updateData.id) {
          el = action.payload.updateData
        } return el;
      });
      return {
        ...state,
        timersList: updatedList,
      };
    }

    case DELETE_TIMER: {
      const newList = state.timersList.filter(timer => timer.id !== action.payload.timerId);
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