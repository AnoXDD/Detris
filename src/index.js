import React from 'react';
import ReactDOM from 'react-dom';
import GridContainer from "./containers/GridContainer";
import registerServiceWorker from './registerServiceWorker';

import "./App.css";

ReactDOM.render(<GridContainer/>, document.getElementById('root'));
registerServiceWorker();
