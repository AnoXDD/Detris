/**
 * Created by Anoxic on 1/12/2018.
 *
 * The root of all reducers
 */

import {combineReducers} from "redux";
import undoable, {includeAction} from "redux-undo";

import control from "./control";
import game from "./game";
import gamePanel from "./gamePanel";
import level from "./level";
import levelEditorPanel from "./levelEditorPanel";
import notification from "./notification";
import overlay from "./overlay";
import tutorial from "./tutorial";
import ActionTypes from "../enum/ActionTypes";

const undoableGameConfig = {
  undoType        : ActionTypes.UNDO_IN_GAME,
  redoType        : ActionTypes.REDO_IN_GAME,
  clearHistoryType: ActionTypes.CLEAR_HISTORY_IN_GAME,
  filter          : includeAction(ActionTypes.NEXT_DETROMINO_IN_GAME),
};

const undoableLevelEditorConfig = {
  undoType        : ActionTypes.UNDO_IN_EDITOR,
  redoType        : ActionTypes.REDO_IN_EDITOR,
  clearHistoryType: ActionTypes.CLEAR_HISTORY_IN_EDITOR,
  filter          : includeAction(ActionTypes.NEXT_DETROMINO_IN_EDITOR),
};

export default combineReducers({
  control,
  game,
  gamePanel       : undoable(gamePanel, undoableGameConfig),
  level,
  levelEditorPanel: undoable(levelEditorPanel, undoableLevelEditorConfig),
  notification,
  overlay,
  tutorial,
});
