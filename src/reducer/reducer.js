/**
 * Created by Anoxic on 1/12/2018.
 *
 * The root of all reducers
 */

import {combineReducers} from "redux";
import undoable from "redux-undo";

import control from "./control";
import game from "./game";
import gamePanel from "./gamePanel";
import level from "./level";
import levelEditorPanel from "./levelEditorPanel";
import notification from "./notification";
import overlay from "./overlay";
import tutorial from "./tutorial";
import {
  undoableGameConfig,
  undoableLevelEditorConfig
} from "../undoable/undoableConfig";

export default combineReducers({
  control,
  game,
  gamePanel       : undoable(gamePanel, undoableGameConfig), //yes
  level,
  levelEditorPanel: undoable(levelEditorPanel, undoableLevelEditorConfig), // yes,
  notification,
  overlay, // yes, conversion
  tutorial,
});
