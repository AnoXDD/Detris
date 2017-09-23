import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import GridContainer from "./containers/GridContainer";
import "./data/KeyboardEvent";


import "./App.css";

ReactDOM.render(<GridContainer/>, document.getElementById('root'));
registerServiceWorker();
