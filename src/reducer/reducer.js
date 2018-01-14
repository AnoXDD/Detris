/**
 * Created by Anoxic on 1/12/2018.
 *
 * The root of all reducers
 */

import {combineReducers} from "redux";
import undoable, {includeAction} from "redux-undo";

import control from "./control";
import game from "./game";
import gameGrid from "./gameGrid";
import level from "./level";
import levelEditorGrid from "./levelEditorGrid";
import notification from "./notification";
import overlay from "./overlay";
import queue from "./queue";
import tutorial from "./tutorial";
import ActionTypes from "../enum/ActionTypes";

const undoableConfig = {
  undoType: ActionTypes.UNDO_IN_GAME,
  redoType: ActionTypes.REDO_IN_GAME,
  filter  : includeAction(ActionTypes.NEXT_DETROMINO_IN_GAME),
};

export default combineReducers({
  control,
  game,
  gameGrid: undoable(gameGrid, undoableConfig),
  level,
  levelEditorGrid,
  notification,
  overlay,
  tutorial,
});
