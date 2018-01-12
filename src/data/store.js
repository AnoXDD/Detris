/**
 * Created by Anoxic on 1/12/2018.
 */

import {createStore} from "redux";

import reducer from "../reducer/reducer";

const store = createStore(reducer);

export default store;