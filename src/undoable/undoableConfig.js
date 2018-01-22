/**
 * Created by Anoxic on 1/14/2018.
 */

import {includeAction} from "redux-undo";

import ActionType from "../enum/ActionType";

export const undoableGameConfig = {
  undoType        : ActionType.UNDO_IN_GAME,
  redoType        : ActionType.REDO_IN_GAME,
  clearHistoryType: ActionType.CLEAR_HISTORY_IN_GAME,
  filter          : includeAction(ActionType.NEXT_DETROMINO_IN_GAME),
};

export const undoableLevelEditorConfig = {
  undoType        : ActionType.UNDO_IN_EDITOR,
  redoType        : ActionType.REDO_IN_EDITOR,
  clearHistoryType: ActionType.CLEAR_HISTORY_IN_EDITOR,
  filter          : includeAction([
    ActionType.NEXT_DETROMINO_IN_EDITOR,
    ActionType.APPLY_LEVEL_EDITOR_GRID
  ]),
};

export default {
  undoableLevelEditorConfig,
  undoableGameConfig,
};