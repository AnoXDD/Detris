/**
 * Created by Anoxic on 1/12/2018.
 */

import {applyMiddleware, compose, createStore} from "redux";
import {delayDispatch} from "../middleware/delayDispatcher";
import persistedReducer from "../persistor/persistedReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(persistedReducer,
  undefined,
  composeEnhancers(applyMiddleware(delayDispatch)));

export default store;