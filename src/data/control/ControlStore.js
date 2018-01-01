/**
 * Created by Anoxic on 10/12/2017.
 */

import Immutable from "immutable";
import {ReduceStore} from "flux/utils";

import Control from "./ControlState";
import ActionTypes from "../enum/ActionTypes";
import GameUiState from "../enum/GameUiState";
import Dispatcher from "../Dispatcher";
import Actions from "../Actions";
import ControlTypes from "../enum/ControlTypes";

class ControlStore extends ReduceStore {

  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return new Control();
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.START_LEVEL:
        return ControlStore.onGameStarted();
      case ActionTypes.SET_GAME_UI_STATE:
        switch (action.uiState) {
          case GameUiState.LEVEL_EDITOR_STARTED:
            return ControlStore.onLevelEditorDisableBlockEditing();
          default:
            return new Control();
        }
      case ActionTypes.DISABLE_BLOCK_EDITING:
        return ControlStore.onLevelEditorDisableBlockEditing();
      case ActionTypes.ENABLE_BLOCK_EDITING:
        return ControlStore.onLevelEditorEnableBlockEditing();
      default:
        return state;
    }
  }

  /**
   * Called when an actual game has started
   */
  static onGameStarted() {
    return new Control({
      rotate : Actions.rotate,
      done   : Actions.nextDetrominoInGame,
      move   : Actions.moveDetrominoInGame,
      enabled: Immutable.Set([
        ControlTypes.CONTROL_ROTATE,
        ControlTypes.CONTROL_UP,
        ControlTypes.CONTROL_DOWN,
        ControlTypes.CONTROL_LEFT,
        ControlTypes.CONTROL_RIGHT,
        ControlTypes.CONTROL_UNDO,
        ControlTypes.CONTROL_REDO,
        ControlTypes.CONTROL_DONE,
      ]),
    });
  }

  /**
   * Called when the player is moving detromino in the level editor
   */
  static onLevelEditorDisableBlockEditing() {
    return new Control({
      done           : Actions.nextDetrominoInEditor,
      move           : Actions.moveDetrominoInEditor,
      toggleEditBlock: Actions.enableBlockEditing,
      nextDetromino  : Actions.nextDetrominoShape,
      prevDetromino  : Actions.prevDetrominoShape,
      redo           : Actions.redoInEditor,
      undo           : Actions.undoInEditor,
      enabled        : Immutable.Set([
        ControlTypes.CONTROL_ROTATE,
        ControlTypes.CONTROL_UP,
        ControlTypes.CONTROL_DOWN,
        ControlTypes.CONTROL_LEFT,
        ControlTypes.CONTROL_RIGHT,
        ControlTypes.CONTROL_UNDO,
        ControlTypes.CONTROL_REDO,
        ControlTypes.CONTROL_DONE,
        ControlTypes.CONTROL_TOGGLE_EDIT,
        ControlTypes.CONTROL_PREV_DETROMINO,
        ControlTypes.CONTROL_NEXT_DETROMINO,
      ]),
    });
  }

  /**
   * Called when the player is moving the editing block in the level editor
   */
  static onLevelEditorEnableBlockEditing() {
    return new Control({
      move           : Actions.moveEditingBlock,
      toggleEditBlock: Actions.disableBlockEditing,
      chooseEditBlock: Actions.setBlockType,
      enabled        : Immutable.Set([
        ControlTypes.CONTROL_UP,
        ControlTypes.CONTROL_DOWN,
        ControlTypes.CONTROL_LEFT,
        ControlTypes.CONTROL_RIGHT,
        ControlTypes.CONTROL_UNDO,
        ControlTypes.CONTROL_REDO,
        ControlTypes.CONTROL_TOGGLE_EDIT,
        ControlTypes.CONTROL_BLOCK_SELECTOR,
      ]),
    });
  }
}

export default new ControlStore();