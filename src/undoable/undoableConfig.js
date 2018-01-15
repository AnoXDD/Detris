/**
 * Created by Anoxic on 1/14/2018.
 */

import {includeAction} from "redux-undo";

import ActionTypes from "../enum/ActionTypes";

export const undoableGameConfig = {
  undoType        : ActionTypes.UNDO_IN_GAME,
  redoType        : ActionTypes.REDO_IN_GAME,
  clearHistoryType: ActionTypes.CLEAR_HISTORY_IN_GAME,
  filter          : includeAction(ActionTypes.NEXT_DETROMINO_IN_GAME),
};

export const undoableLevelEditorConfig = {
  undoType        : ActionTypes.UNDO_IN_EDITOR,
  redoType        : ActionTypes.REDO_IN_EDITOR,
  clearHistoryType: ActionTypes.CLEAR_HISTORY_IN_EDITOR,
  filter          : includeAction(ActionTypes.NEXT_DETROMINO_IN_EDITOR),
};

export default {
  undoableLevelEditorConfig,
  undoableGameConfig,
};