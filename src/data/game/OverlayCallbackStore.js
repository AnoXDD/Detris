/**
 * Created by Anoxic on 9/26/2017.
 * A store for the queue holding detrominos
 */

import {ReduceStore} from "flux/utils";

import Dispatcher from "../Dispatcher";

import ActionTypes from "../enum/ActionTypes";
import Actions from "../Actions";
import CallbackState from "./CallbackState";
import GameUiState from "../enum/GameUiState";
import OverlayType from "../enum/OverlayTypes";
import TutorialProgress from "../enum/TutorialProgress";

class CallbackStore extends ReduceStore {
  constructor() {
    super(Dispatcher);
  }

  static reset() {
    return new CallbackState();
  }

  getInitialState() {
    return CallbackStore.reset();
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.START_LEVEL:
        return CallbackStore.hidePauseMenu(
          state.set("onQuit",
            Actions.showDialogForQuitToLevelSelect))
          .set("onRestart",
            Actions.showDialogForGameRestart);
      case ActionTypes.RESUME:
        return CallbackStore.hidePauseMenu(state);
      case ActionTypes.PAUSE:
        return state.set("onBack", Actions.resume);
      case ActionTypes.SET_GAME_UI_STATE:
        switch (action.uiState) {
          case GameUiState.SELECT_LEVEL:
            return state.set("onQuit", Actions.showWelcomePage);
          case GameUiState.LEVEL_EDITOR_STARTED:
            return CallbackStore.hidePauseMenu(state.set("onQuit",
              Actions.showDialogForQuitToWelcome)
              .set("onRestart", Actions.showDialogForResetLevelEditor));
          default:
            return state;
        }
      case ActionTypes.SHOW_FULLSCREEN_OVERLAY:
        switch (action.overlayType) {
          case OverlayType.DIALOG:
            let {
              onYes = () => {
              },
              onNo = () => {
              }
            } = action;

            return state.set("onDialogYes", () => {
              onYes();
              Actions.hideAllFullscreenOverlay();
            }).set("onDialogNo", () => {
              onNo();
              Actions.hideDialog();
            });
          default:
            return state;
        }
      case ActionTypes.HIDE_ALL_FULLSCREEN_OVERLAY:
        return CallbackStore.hideAllFloatingWindows(state);
      case ActionTypes.SET_TUTORIAL_PROGRESS:
        return CallbackStore.applyTutorialProgress(state, action.progress);
      default:
        return state;
    }
  }

  static hideAllFloatingWindows(state) {
    return CallbackStore.hidePauseMenu(state);
  }

  static hidePauseMenu(state) {
    return state.set("onBack", Actions.pause);
  }

  static applyTutorialProgress(state, progress) {
    // Button for show tutorial guide
    if (progress === TutorialProgress.GAME_INTRO_GUIDE_TOGGLE) {
      state = state.set("onShowGuide", () => {
        Actions.nextTutorial();
        Actions.showTutorialGuide();
      });
    } else {
      state = state.set("onShowGuide", Actions.showTutorialGuide);
    }

    switch (progress) {
      case TutorialProgress.GAME_INTRO:
        return state.set("onDismiss", Actions.nextTutorial);
      case TutorialProgress.GAME_INTRO_GUIDE_TOGGLE:
        return state.set("onDismiss", Actions.hideTutorialGuide);
      case TutorialProgress.MOVE_DETROMINO_INTRO:
        return state.set("onDismiss", Actions.nextTutorial);
      case TutorialProgress.MOVE_DETROMINO_LEFT_RIGHT:
      case TutorialProgress.MOVE_DETROMINO_NO_OVERLAP:
      case TutorialProgress.MOVE_DETROMINO_ROTATE:
        return state.set("onDismiss", Actions.hideTutorialGuide);
      case TutorialProgress.MECHANISM_INTRO:
      case TutorialProgress.MECHANISM_DEMO_INTRO:
        return state.set("onDismiss", Actions.nextTutorial);
      case TutorialProgress.MECHANISM_DEMO_I_INTRO:
        return state.set("onDismiss", Actions.hideTutorialGuide);
      case TutorialProgress.MECHANISM_DEMO_I_FALLING:
      case TutorialProgress.MECHANISM_DEMO_I_APPLYING:
      case TutorialProgress.MECHANISM_DEMO_I_RESULT:
        return state.set("onDismiss", Actions.nextTutorial);
      case TutorialProgress.MECHANISM_DEMO_T_INTRO:
        return state.set("onDismiss", Actions.hideTutorialGuide);
      case TutorialProgress.MECHANISM_DEMO_T_FALLING:
      case TutorialProgress.MECHANISM_DEMO_T_FALLING_EXPLANATION:
      case TutorialProgress.MECHANISM_DEMO_T_APPLYING:
      case TutorialProgress.MECHANISM_DEMO_T_TARGET_FALLING:
      case TutorialProgress.MECHANISM_DEMO_T_TARGET_BLOCKS:
      case TutorialProgress.MECHANISM_DEMO_T_RESULT:
        return state.set("onDismiss", Actions.nextTutorial);
      case TutorialProgress.MECHANISM_DEMO_FLOOR_INTRO:
        return state.set("onDismiss", Actions.hideTutorialGuide);
      case TutorialProgress.MECHANISM_DEMO_FLOOR_RESULT:
        return state.set("onDismiss", Actions.nextTutorial);
      case TutorialProgress.MECHANISM_DEMO_FREE_PLAY_INTRO:
      case TutorialProgress.MECHANISM_DEMO_FREE_PLAY_UNDO_REDO:
        return state.set("onDismiss", Actions.nextTutorial);
      case TutorialProgress.MECHANISM_DEMO_FREE_PLAY:
        return state.set("onDismiss", () => {
          Actions.hideTutorialGuide();
          Actions.setNextTutorialProgress();
        });
      case TutorialProgress.FIRST_GAME_INTRO:
        return state.set("onDismiss", Actions.nextTutorial);
      case TutorialProgress.FIRST_GAME_START:
      case TutorialProgress.FIRST_GAME_DONE:
        return state.set("onDismiss", Actions.hideTutorialGuide);
      default:
        return state;
    }
  }
}

export default new CallbackStore();