import { createStore, combineReducers } from "redux";
import trackerReducer from './components/tracker.reducer';


const reducer = combineReducers({
  tracks: trackerReducer
})


const store = createStore(reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;