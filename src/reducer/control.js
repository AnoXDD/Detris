/**
 * Created by Anoxic on 1/11/2018.
 */

import ActionTypes from "../enum/ActionTypes";
import GameUiState from "../enum/GameUiState";
import TutorialProgress from "../enum/TutorialProgress";
import ControlPresets from "../enum/ControlPresets";
import GridHistoryHelper from "../data/grid/GridHistoryHelper";

/**
 * Called when an actual game has started
 */
function onGameStarted() {
  return fullGameControlWithHistory();
}

/**
 * Called when the player is moving detromino in the level editor
 */
function onLevelEditorDisableBlockEditing() {
  return ControlPresets.LEVEL_EDITOR_BLOCK_EDITING_DISABLED;
}

/**
 * Called when the player is moving the editing block in the level editor
 */
function onLevelEditorEnableBlockEditing() {
  return ControlPresets.LEVEL_EDITOR_BLOCK_EDITING_ENABLED;
}

function onTutorialProgress(progress) {
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
function fullGameControlWithHistory() {
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

export default function control(state = ControlPresets.EMPTY, action) {
  switch (action.type) {
    case ActionTypes.START_LEVEL:
      return onGameStarted();
    case ActionTypes.NEXT_DETROMINO_IN_GAME:
    case ActionTypes.UNDO_IN_GAME:
    case ActionTypes.REDO_IN_GAME:
      return fullGameControlWithHistory();
    case ActionTypes.SET_GAME_UI_STATE:
      switch (action.uiState) {
        case GameUiState.LEVEL_EDITOR_STARTED:
          return onLevelEditorDisableBlockEditing();
        default:
          return ControlPresets.EMPTY;
      }
    case ActionTypes.DISABLE_BLOCK_EDITING:
      return onLevelEditorDisableBlockEditing();
    case ActionTypes.ENABLE_BLOCK_EDITING:
      return onLevelEditorEnableBlockEditing();
    case ActionTypes.SET_TUTORIAL_PROGRESS:
      return onTutorialProgress(action.progress);
    default:
      return state;
  }
}