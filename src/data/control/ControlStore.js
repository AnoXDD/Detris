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
import TutorialProgress from "../enum/TutorialProgress";
import GridHistoryHelper from "../grid/GridHistoryHelper";
import ControlPresets from "../enum/ControlPresets";

class ControlStore extends ReduceStore {

  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return ControlPresets.EMPTY;
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.START_LEVEL:
        return ControlStore.onGameStarted();
      case ActionTypes.NEXT_DETROMINO_IN_GAME:
      case ActionTypes.UNDO_IN_GAME:
      case ActionTypes.REDO_IN_GAME:
        return ControlStore.fullGameControlWithHistory();
      case ActionTypes.SET_GAME_UI_STATE:
        switch (action.uiState) {
          case GameUiState.LEVEL_EDITOR_STARTED:
            return ControlStore.onLevelEditorDisableBlockEditing();
          default:
            return ControlPresets.EMPTY;
        }
      case ActionTypes.DISABLE_BLOCK_EDITING:
        return ControlStore.onLevelEditorDisableBlockEditing();
      case ActionTypes.ENABLE_BLOCK_EDITING:
        return ControlStore.onLevelEditorEnableBlockEditing();
      case ActionTypes.SET_TUTORIAL_PROGRESS:
        return ControlStore.onTutorialProgress(action.progress);
      default:
        return state;
    }
  }

  /**
   * Called when an actual game has started
   */
  static onGameStarted() {
    return ControlStore.fullGameControlWithHistory();
  }

  /**
   * Called when the player is moving detromino in the level editor
   */
  static onLevelEditorDisableBlockEditing() {
    return ControlPresets.LEVEL_EDITOR_BLOCK_EDITING_DISABLED;
  }

  /**
   * Called when the player is moving the editing block in the level editor
   */
  static onLevelEditorEnableBlockEditing() {
    return ControlPresets.LEVEL_EDITOR_BLOCK_EDITING_ENABLED;
  }

  static onTutorialProgress(progress) {
    switch (progress) {
      case TutorialProgress.TUTORIAL_INTRO:
      case TutorialProgress.TUTORIAL_INTRO_GUIDE_TOGGLE:
        return ControlPresets.EMPTY;

      case TutorialProgress.MOVE_DETROMINO_INTRO:
        return ControlPresets.ARROW_ONLY_NO_FUNCTION;
      case TutorialProgress.MOVE_DETROMINO_LEFT_RIGHT:
      case TutorialProgress.MOVE_DETROMINO_NO_OVERLAP:
        return ControlPresets.ARROW_ONLY;
      case TutorialProgress.MOVE_DETROMINO_ROTATE:
        return ControlPresets.ARROW_AND_ROTATE_ONLY;

      case TutorialProgress.MECHANISM_INTRO:
      case TutorialProgress.MECHANISM_DEMO_INTRO:
        return ControlPresets.EMPTY;
      case TutorialProgress.MECHANISM_DEMO_I_INTRO:
        return ControlPresets.NEXT_DETROMINO_ONLY;
      case TutorialProgress.MECHANISM_DEMO_I_FALLING:
      case TutorialProgress.MECHANISM_DEMO_I_APPLYING:
      case TutorialProgress.MECHANISM_DEMO_I_RESULT:
        return ControlPresets.EMPTY;
      case TutorialProgress.MECHANISM_DEMO_T_INTRO:
        return ControlPresets.NEXT_DETROMINO_ONLY;
      case TutorialProgress.MECHANISM_DEMO_T_FALLING:
      case TutorialProgress.MECHANISM_DEMO_T_FALLING_EXPLANATION:
      case TutorialProgress.MECHANISM_DEMO_T_APPLYING:
      case TutorialProgress.MECHANISM_DEMO_T_TARGET_FALLING:
      case TutorialProgress.MECHANISM_DEMO_T_TARGET_BLOCKS:
      case TutorialProgress.MECHANISM_DEMO_T_RESULT:
        return ControlPresets.EMPTY;
      case TutorialProgress.MECHANISM_DEMO_FLOOR_INTRO:
        return ControlPresets.NEXT_DETROMINO_ONLY;
      case TutorialProgress.MECHANISM_DEMO_FLOOR_RESULT:
        return ControlPresets.EMPTY;
      case TutorialProgress.MECHANISM_DEMO_FREE_PLAY_INTRO:
      case TutorialProgress.MECHANISM_DEMO_FREE_PLAY_UNDO_REDO:
      case TutorialProgress.MECHANISM_DEMO_FREE_PLAY:

      case TutorialProgress.FIRST_GAME_INTRO:
      case TutorialProgress.FIRST_GAME_START:
        return ControlPresets.TUTORIAL_TRY_OUT;
      default:
        return ControlPresets.EMPTY;
    }
  }

  /**
   * Returns a full game control with undo/redo, depending on if the history
   * actually has it
   * @return {Map<string, any>}
   */
  static fullGameControlWithHistory() {
    if (GridHistoryHelper.canUndoInGame()) {
      if (GridHistoryHelper.canRedoInGame()) {
        return ControlPresets.FULL_GAME_CONTROL_WITH_UNDO_REDO;
      }

      return ControlPresets.FULL_GAME_CONTROL_WITH_UNDO;
    }

    if (GridHistoryHelper.canRedoInGame()) {
      return ControlPresets.FULL_GAME_CONTROL_WITH_REDO;
    }

    return ControlPresets.FULL_GAME_CONTROL;
  }

}

export default new ControlStore();