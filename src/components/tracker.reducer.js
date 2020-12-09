import { ADD_LAP, DELETE_LAP } from './tracker.actions';

// const localState = () => Object.values(localStorage)
//   .filter(element => element.includes('seconds'))
//   .map(value => JSON.parse(value));
// let data = tracks.concat(localState());

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
      localStorage.removeItem(action.payload.lapId);
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