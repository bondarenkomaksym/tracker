import { ADD_LAP, DELETE_LAP } from './tracker.actions';

const initialState = {
  tracksList: [],
}

const trackerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LAP: {
      return {
        ...state,
        tracksList: state.tracksList
          .concat(action.payload.lapData)
      };
    }
    case DELETE_LAP: {
      const newList = state.tracksList.filter(track => track.id !== action.payload.lapId);
      return {
        ...state,
        tracksList: newList,
      };
    }
    default:
      return state;
  }
};

export default trackerReducer;