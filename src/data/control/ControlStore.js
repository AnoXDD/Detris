/**
 * Created by Anoxic on 10/12/2017.
 */

import {ReduceStore} from "flux/utils";

import Control from "./Control";
import ActionTypes from "../enum/ActionTypes";
import GameUiState from "../enum/GameUiState";
import Dispatcher from "../Dispatcher";
import Actions from "../enum/Actions";

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
            return ControlStore.onLevelEditorMoveDetromino();
          default:
            return new Control();
        }
      case ActionTypes.DISABLE_BLOCK_EDITING:
        return ControlStore.onLevelEditorMoveDetromino();
      case ActionTypes.ENABLE_BLOCK_EDITING:
        return ControlStore.onLevelEditorMoveEditingBlock();
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
  static onLevelEditorMoveDetromino() {
    return new Control({
      done           : Actions.nextDetrominoInEditor,
      move           : Actions.moveDetrominoInEditor,
      toggleEditBlock: Actions.enableBlockEditing,
    });
  }

  /**
   * Called when the player is moving the editing block in the level editor
   */
  static onLevelEditorMoveEditingBlock() {
    return new Control({
      move           : Actions.moveEditingBlock,
      toggleEditBlock: Actions.disableBlockEditing,
    });
  }
}

export default new ControlStore();