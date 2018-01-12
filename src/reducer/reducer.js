/**
 * Created by Anoxic on 1/12/2018.
 *
 * The root of all reducers
 */

import {combineReducers} from "redux";

import control from "./control";
import game from "./game";
import gameGrid from "./gameGrid";
import level from "./level";
import levelEditorGrid from "./levelEditorGrid";
import notification from "./notification";
import callback from "./callback";
import queue from "./queue";
import tutorial from "./tutorial";

export default combineReducers({
  control,
  game,
  gameGrid,
  level,
  levelEditorGrid,
  notification,
  callback,
  queue,
  tutorial,
});
