import React from "react";
import { Provider } from "react-redux";
import Tracker from "./components/Tracker";
import store from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <Tracker />
    </Provider>)

}

export default App;