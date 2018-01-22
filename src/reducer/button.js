/**
 * Created by Anoxic on 9/26/2017.
 * A store for the queue holding detrominos
 */

import ActionType from "../enum/ActionType";
import Actions from "../data/Actions";
import ButtonCallbacks from "../state/ButtonCallbacks";
import GameUiState from "../enum/GameUiState";
import OverlayType from "../enum/OverlayType";
import TutorialProgress from "../enum/TutorialProgress";
import {createBatchActions} from "../middleware/delayDispatcher";
import DialogType from "../enum/DialogType";
import {saveSteps} from "../util/actionStepRecord";

function getInitialState() {
  return new ButtonCallbacks();
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

function reduceDialog(action, state) {
  let onYes = null;
  let onNo = null;

  switch (action.dialogType) {
    case DialogType.START_TUTORIAL:
      onYes = createBatchActions(
        Actions.startTutorial(),
        Actions.showTutorialGuide()
      );
      break;

    case DialogType.GAME_RESTART:
      onYes = Actions.restartCurrentLevel();
      break;

    case DialogType.RESET_LEVEL_EDITOR:
      onYes = Actions.resetGrid();
      break;

    case DialogType.QUIT_TO_SELECT_LEVEL:
      onYes = Actions.showSelectLevel();
      break;

    case DialogType.QUIT_TO_WELCOME:
      onYes = Actions.showWelcomePage();
      break;

    case DialogType.SKIP_TUTORIAL:
      onYes = createBatchActions(
        Actions.setTutorialCompleted(),
        Actions.showSelectLevel()
      );
      break;

    case DialogType.END_TUTORIAL:
      onYes = createBatchActions(
        Actions.setTutorialCompleted(),
        Actions.showWelcomePage()
      );
      break;

    case DialogType.RESET_GAME:
      onYes = Actions.reset();
      break;

    default:
  }

  return state.set("onDialogYes", () => createBatchActions(
    Actions.hideAllFullscreenOverlay(),
    onYes
  )).set("onDialogNo", () => createBatchActions(
    Actions.hideDialog(),
    onNo
  ));
}

export function reduceButton(state = getInitialState(), action) {
  switch (action.type) {
    case ActionType.START_LEVEL:
      return hidePauseMenu(
        state.set("onQuit",
          Actions.showDialogForQuitToSelectLevel))
        .set("onRestart",
          Actions.showDialogForGameRestart);
    case ActionType.RESUME:
      return hidePauseMenu(state);
    case ActionType.PAUSE:
      return state.set("onBack", Actions.resume);
    case ActionType.SET_GAME_UI_STATE:
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
    case ActionType.SHOW_FULLSCREEN_OVERLAY:
      switch (action.overlayType) {
        case OverlayType.DIALOG:
          return reduceDialog(action, state);
        default:
          return state;
      }
    case ActionType.HIDE_ALL_FULLSCREEN_OVERLAY:
      return hideAllFloatingWindows(state);
    case ActionType.SET_TUTORIAL_PROGRESS:
      return applyTutorialProgress(state, action.progress);
    default:
      return state;
  }
}

export default function reduce(state, action) {
  if (action.type === ActionType.RESET) {
    return getInitialState();
  }

  return saveSteps(reduceButton(state, action), "history", action);
}
