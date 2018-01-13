import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import {Provider} from "react-redux";

// Global js
import "./data/storeListener/LocalStorageSaver";
import "./data/DispatchRegister";
import "./App.css";

import store from "./store/store";
import GameContainer from "./containers/GameContainer";

ReactDOM.render(
  <Provider store={store}>
    <GameContainer/>
  </Provider>,
  document.getElementById('root'));

registerServiceWorker();
