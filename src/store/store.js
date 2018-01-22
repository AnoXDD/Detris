/**
 * Created by Anoxic on 1/12/2018.
 */

import {applyMiddleware, compose, createStore} from "redux";
import {delayDispatch} from "../middleware/delayDispatcher";
import persistedReducer from "../persistor/persistedReducer";
import musicPlayer from "../middleware/musicPlayer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(persistedReducer,
  undefined,
  composeEnhancers(applyMiddleware(delayDispatch, musicPlayer)));

export default store;