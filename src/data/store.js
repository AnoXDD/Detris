/**
 * Created by Anoxic on 1/12/2018.
 */

import {applyMiddleware, createStore} from "redux";

import reducer from "../reducer/reducer";
import delayDispatcher from "../middleware/delayDispatcher";

const store = createStore(reducer, undefined, applyMiddleware(delayDispatcher));

export default store;