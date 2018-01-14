import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import {Provider} from "react-redux";

// Global js
import "./store/LocalStorageSaver";
import "./App.css";

import store from "./store/store";
import GameContainer from "./containers/GameContainer";

ReactDOM.render(
  <Provider store={store}>
    <GameContainer/>
  </Provider>,
  document.getElementById('root'));

registerServiceWorker();
