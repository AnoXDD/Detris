/**
 * Created by Anoxic on 9/26/2017.
 * A store for the queue holding detrominos
 */

import ActionTypes from "../enum/ActionTypes";
import Actions from "../data/Actions";
import CallbackState from "../state/Callbacks";
import GameUiState from "../enum/GameUiState";
import OverlayType from "../enum/OverlayTypes";
import TutorialProgress from "../enum/TutorialProgress";
import {createBatchActions} from "../middleware/delayDispatcher";

function reset() {
  return new CallbackState();
}

function hideAllFloatingWindows(state) {
  return hidePauseMenu(state);
}

function hidePauseMenu(state) {
  return state.set("onBack", Actions.pause);
}

function applyTutorialProgress(state, progress) {
  state = state.set("onQuit", Actions.showDialogForEndTutorial);

  // Button for show tutorial guide
  if (progress === TutorialProgress.TUTORIAL_INTRO_GUIDE_TOGGLE) {
    state = state.set("onShowGuide", () => createBatchActions(
      Actions.nextTutorial(),
      Actions.showTutorialGuide(),
    ));
  } else {
    state = state.set("onShowGuide", Actions.showTutorialGuide);
  }

  switch (progress) {
    case TutorialProgress.TUTORIAL_INTRO:
      return state.set("onDismiss", Actions.nextTutorial);
    case TutorialProgress.TUTORIAL_INTRO_GUIDE_TOGGLE:
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
      return state.set("onDismiss", () => createBatchActions(
        Actions.hideTutorialGuide(),
        Actions.setNextTutorialProgress()
      ));
    case TutorialProgress.FIRST_GAME_INTRO:
      return state.set("onDismiss", Actions.nextTutorial);
    case TutorialProgress.FIRST_GAME_START:
      return state.set("onDismiss", Actions.completeTutorial);
    default:
      return state;
  }
}

export default function reduce(state = reset(), action) {
  switch (action.type) {
    case ActionTypes.START_LEVEL:
      return hidePauseMenu(
        state.set("onQuit",
          Actions.showDialogForQuitToLevelSelect))
        .set("onRestart",
          Actions.showDialogForGameRestart);
    case ActionTypes.RESUME:
      return hidePauseMenu(state);
    case ActionTypes.PAUSE:
      return state.set("onBack", Actions.resume);
    case ActionTypes.SET_GAME_UI_STATE:
      switch (action.uiState) {
        case GameUiState.SELECT_LEVEL:
          return state.set("onQuit", Actions.showWelcomePage);
        case GameUiState.LEVEL_EDITOR_STARTED:
          return hidePauseMenu(state
            .set("onQuit", Actions.showDialogForQuitToWelcome)
            .set("onRestart", Actions.showDialogForResetLevelEditor));
        default:
          return state;
      }
    case ActionTypes.SHOW_FULLSCREEN_OVERLAY:
      switch (action.overlayType) {
        case OverlayType.DIALOG:
          let {
            onYes = null,
            onNo = null
          } = action;

          return state.set("onDialogYes", () => createBatchActions(
            Actions.hideAllFullscreenOverlay(),
            onYes
          )).set("onDialogNo", () => createBatchActions(
            Actions.hideDialog(),
            onNo
          ));
        default:
          return state;
      }
    case ActionTypes.HIDE_ALL_FULLSCREEN_OVERLAY:
      return hideAllFloatingWindows(state);
    case ActionTypes.SET_TUTORIAL_PROGRESS:
      return applyTutorialProgress(state, action.progress);
    default:
      return state;
  }
}
