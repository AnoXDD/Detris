/**
 * Created by Anoxic on 9/21/2017.
 *
 * A dispatcher for grid actions
 */

import {Dispatcher} from "flux";
import GridActionTypes from "./GridActionTypes";

let anyPayloadToken = null;
let nextDetrominoToken = null;

const GridDispatcher = new Dispatcher();

export default GridDispatcher;