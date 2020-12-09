import { ADD_LAP, DELETE_LAP } from './tracker.actions';

// const getLocalStorageData = () => {

//   return Object.values(localStorage)
//     .filter(element => element.includes('seconds'))
//     .map(value => JSON.parse(value))
// }
// // console.log(getLocalStorageData());
// const localData = getLocalStorageData();

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
        // .concat(localData),
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