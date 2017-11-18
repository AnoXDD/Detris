/**
 * Created by Anoxic on 10/12/2017.
 */

import {ReduceStore} from "flux/utils";

import Control from "./Control";
import ActionTypes from "../enum/ActionTypes";
import GameUiState from "../enum/GameUiState";
import Dispatcher from "../Dispatcher";
import Actions from "../Actions";

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
          case GameUiState.SHOW_LEVEL_EDITOR:
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
      rotate: Actions.rotate,
      done  : Actions.nextDetrominoInGame,
      move  : Actions.moveDetrominoInGame,
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
    });
  }
}

export default new ControlStore();