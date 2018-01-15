/**
 * Created by Anoxic on 1/14/2018.
 *
 * Another wrapper for data persistence
 */

import {persistStore} from "redux-persist";
import store from "./store";

export default persistStore(store);