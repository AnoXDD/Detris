import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/es/integration/react";

// Global js
import "./store/LocalStorageSaver";
import "./App.css";

import store from "./store/store";
import GameContainer from "./containers/GameContainer";
import persistor from "./store/persistor";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <GameContainer/>
    </PersistGate>
  </Provider>,
  document.getElementById('root'));

registerServiceWorker();
