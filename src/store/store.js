/**
 * Created by Anoxic on 1/12/2018.
 */

import {applyMiddleware, compose, createStore} from "redux";

import reducer from "../reducer/reducer";
import {delayDispatch} from "../middleware/delayDispatcher";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(reducer,
  undefined,
  composeEnhancers(applyMiddleware(delayDispatch)));

export default store;