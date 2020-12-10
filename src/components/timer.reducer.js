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
      const updatedList = JSON.parse(JSON.stringify(state.timersList));
      for (let index = 0; index < updatedList.length; index++) {
        let timer = updatedList[index];
        if (timer.id === action.payload.updateData.id) {
          timer = action.payload.updateData
          updatedList[index] = timer;
          break;
        }
      }
      return {
        ...state,
        timersList: updatedList,
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