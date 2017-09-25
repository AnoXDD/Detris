import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import GridContainer from "./containers/GridContainer";

// Global js
import "./data/KeyboardEvent";
import "./data/localStorage/LocalStorageSaver";

import "./App.css";

ReactDOM.render(<GridContainer/>, document.getElementById('root'));
registerServiceWorker();
