import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";

// Global js
import "./data/storeListener/LocalStorageSaver";
import "./data/DispatchRegister";

import GameContainer from "./components/GameContainer";

import "./App.css";

ReactDOM.render(<GameContainer/>, document.getElementById('root'));
registerServiceWorker();
