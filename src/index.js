import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

// Global js
import "./data/KeyboardEvent";
import "./data/localStorage/LocalStorageSaver";

import GameContainer from "./containers/GameContainer";

import "./App.css";

ReactDOM.render(<GameContainer/>, document.getElementById('root'));
registerServiceWorker();
