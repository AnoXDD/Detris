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
    return ControlStore.fullGameControl();
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

  static onTutorialProgress(progress) {
    switch (progress) {
      case TutorialProgress.TUTORIAL_INTRO:
      case TutorialProgress.TUTORIAL_INTRO_GUIDE_TOGGLE:
        return new Control();

      case TutorialProgress.MOVE_DETROMINO_INTRO:
        return new Control({
          enabled: Immutable.Set([
            ControlTypes.CONTROL_UP,
            ControlTypes.CONTROL_DOWN,
            ControlTypes.CONTROL_LEFT,
            ControlTypes.CONTROL_RIGHT,
          ]),
        });
      case TutorialProgress.MOVE_DETROMINO_LEFT_RIGHT:
      case TutorialProgress.MOVE_DETROMINO_NO_OVERLAP:
        return new Control({
          move   : Actions.moveDetrominoInTutorial,
          enabled: Immutable.Set([
            ControlTypes.CONTROL_UP,
            ControlTypes.CONTROL_DOWN,
            ControlTypes.CONTROL_LEFT,
            ControlTypes.CONTROL_RIGHT,
          ]),
        });
      case TutorialProgress.MOVE_DETROMINO_ROTATE:
        return new Control({
          move   : Actions.moveDetrominoInTutorial,
          rotate : Actions.rotateInTutorial,
          enabled: Immutable.Set([
            ControlTypes.CONTROL_UP,
            ControlTypes.CONTROL_DOWN,
            ControlTypes.CONTROL_LEFT,
            ControlTypes.CONTROL_RIGHT,
            ControlTypes.CONTROL_ROTATE,
          ]),
        });

      case TutorialProgress.MECHANISM_INTRO:
      case TutorialProgress.MECHANISM_DEMO_INTRO:
        return new Control();
      case TutorialProgress.MECHANISM_DEMO_I_INTRO:
        return new Control({
          done   : Actions.nextTutorial,
          enabled: Immutable.Set([
            ControlTypes.CONTROL_DONE,
          ]),
        });
      case TutorialProgress.MECHANISM_DEMO_I_FALLING:
      case TutorialProgress.MECHANISM_DEMO_I_APPLYING:
      case TutorialProgress.MECHANISM_DEMO_I_RESULT:
        return new Control();
      case TutorialProgress.MECHANISM_DEMO_T_INTRO:
        return new Control({
          done   : Actions.nextTutorial,
          enabled: Immutable.Set([
            ControlTypes.CONTROL_DONE,
          ]),
        });
      case TutorialProgress.MECHANISM_DEMO_T_FALLING:
      case TutorialProgress.MECHANISM_DEMO_T_FALLING_EXPLANATION:
      case TutorialProgress.MECHANISM_DEMO_T_APPLYING:
      case TutorialProgress.MECHANISM_DEMO_T_TARGET_FALLING:
      case TutorialProgress.MECHANISM_DEMO_T_TARGET_BLOCKS:
      case TutorialProgress.MECHANISM_DEMO_T_RESULT:
        return new Control();
      case TutorialProgress.MECHANISM_DEMO_FLOOR_INTRO:
        return new Control({
          done   : Actions.nextTutorial,
          enabled: Immutable.Set([
            ControlTypes.CONTROL_DONE,
          ]),
        });
      case TutorialProgress.MECHANISM_DEMO_FLOOR_RESULT:
        return new Control();
      case TutorialProgress.MECHANISM_DEMO_FREE_PLAY_INTRO:
      case TutorialProgress.MECHANISM_DEMO_FREE_PLAY_UNDO_REDO:
      case TutorialProgress.MECHANISM_DEMO_FREE_PLAY:
      case TutorialProgress.FIRST_GAME_INTRO:
      case TutorialProgress.FIRST_GAME_START:
        return ControlStore.fullGameControl()
          .set("done", Actions.nextDetromino);
      default:
        return new Control();
    }
  }

  static fullGameControl() {
    return new Control({
      rotate : Actions.rotateInTutorial,
      done   : Actions.nextDetrominoInGame,
      move   : Actions.moveDetrominoInTutorial,
      undo   : Actions.undoInGame,
      redo   : Actions.redoInGame,
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

}

export default new ControlStore();