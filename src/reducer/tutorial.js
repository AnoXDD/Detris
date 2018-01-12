/**
 * Created by Anoxic on 12/31/2017.
 * A store for the tutorial state
 */

import ActionTypes from "../enum/ActionTypes";
import TutorialProgress from "../enum/TutorialProgress";
import TutorialState from "../state/Tutorial";
import TutorialGuidePosition from "../enum/TutorialGuidePosition";


function reset() {
  return new TutorialState();
}

function getInitialState() {
  return reset();
}

function applyTutorialPosition(state, progress) {
  switch (progress) {
    case TutorialProgress.TUTORIAL_INTRO:
    case TutorialProgress.TUTORIAL_INTRO_GUIDE_TOGGLE:
      return state.set("position", TutorialGuidePosition.BOTTOM);
    case TutorialProgress.MOVE_DETROMINO_INTRO:
      return state.set("position", TutorialGuidePosition.CENTER);
    case TutorialProgress.MOVE_DETROMINO_LEFT_RIGHT:
      return state.set("position", TutorialGuidePosition.CENTER);
    case TutorialProgress.MOVE_DETROMINO_NO_OVERLAP:
      return state.set("position", TutorialGuidePosition.CENTER);
    case TutorialProgress.MOVE_DETROMINO_ROTATE:
      return state.set("position", TutorialGuidePosition.CENTER);
    case TutorialProgress.MECHANISM_INTRO:
    case TutorialProgress.MECHANISM_DEMO_INTRO:
    case TutorialProgress.MECHANISM_DEMO_I_INTRO:
    case TutorialProgress.MECHANISM_DEMO_I_FALLING:
    case TutorialProgress.MECHANISM_DEMO_I_APPLYING:
    case TutorialProgress.MECHANISM_DEMO_I_RESULT:
    case TutorialProgress.MECHANISM_DEMO_T_INTRO:
    case TutorialProgress.MECHANISM_DEMO_T_FALLING:
    case TutorialProgress.MECHANISM_DEMO_T_FALLING_EXPLANATION:
    case TutorialProgress.MECHANISM_DEMO_T_APPLYING:
    case TutorialProgress.MECHANISM_DEMO_T_TARGET_FALLING:
    case TutorialProgress.MECHANISM_DEMO_T_TARGET_BLOCKS:
    case TutorialProgress.MECHANISM_DEMO_T_RESULT:
    case TutorialProgress.MECHANISM_DEMO_FLOOR_INTRO:
    case TutorialProgress.MECHANISM_DEMO_FLOOR_RESULT:
      return state.set("position", TutorialGuidePosition.BOTTOM);
    case TutorialProgress.MECHANISM_DEMO_FREE_PLAY_INTRO:
      return state.set("position", TutorialGuidePosition.TOP);
    case TutorialProgress.MECHANISM_DEMO_FREE_PLAY_UNDO_REDO:
      return state.set("position", TutorialGuidePosition.CENTER);
    case TutorialProgress.MECHANISM_DEMO_FREE_PLAY:
      return state.set("position", TutorialGuidePosition.TOP);
    case TutorialProgress.FIRST_GAME_INTRO:
    case TutorialProgress.FIRST_GAME_START:
      return state.set("position", TutorialGuidePosition.TOP);
    default:
      return state;
  }
}

function applyTutorialProgress(state, progress) {
  switch (progress) {
    case TutorialProgress.TUTORIAL_INTRO:
    case TutorialProgress.TUTORIAL_INTRO_GUIDE_TOGGLE:
    case TutorialProgress.MOVE_DETROMINO_INTRO:
    case TutorialProgress.MOVE_DETROMINO_LEFT_RIGHT:
    case TutorialProgress.MOVE_DETROMINO_NO_OVERLAP:
    case TutorialProgress.MOVE_DETROMINO_ROTATE:
    case TutorialProgress.MECHANISM_INTRO:
    case TutorialProgress.MECHANISM_DEMO_INTRO:
    case TutorialProgress.MECHANISM_DEMO_I_INTRO:
    case TutorialProgress.MECHANISM_DEMO_I_FALLING:
    case TutorialProgress.MECHANISM_DEMO_I_APPLYING:
    case TutorialProgress.MECHANISM_DEMO_I_RESULT:
    case TutorialProgress.MECHANISM_DEMO_T_INTRO:
    case TutorialProgress.MECHANISM_DEMO_T_FALLING:
    case TutorialProgress.MECHANISM_DEMO_T_FALLING_EXPLANATION:
    case TutorialProgress.MECHANISM_DEMO_T_APPLYING:
    case TutorialProgress.MECHANISM_DEMO_T_TARGET_FALLING:
    case TutorialProgress.MECHANISM_DEMO_T_TARGET_BLOCKS:
    case TutorialProgress.MECHANISM_DEMO_T_RESULT:
    case TutorialProgress.MECHANISM_DEMO_FLOOR_INTRO:
    case TutorialProgress.MECHANISM_DEMO_FLOOR_RESULT:
    case TutorialProgress.MECHANISM_DEMO_FREE_PLAY_INTRO:
    case TutorialProgress.MECHANISM_DEMO_FREE_PLAY_UNDO_REDO:
    case TutorialProgress.MECHANISM_DEMO_FREE_PLAY:
    case TutorialProgress.FIRST_GAME_INTRO:
    case TutorialProgress.FIRST_GAME_START:
      return state.set("progress", progress);
    default:
      return state;
  }
}

export default function reduce(state = getInitialState(), action) {
  switch (action.type) {
    case ActionTypes.SET_TUTORIAL_PROGRESS:
      state = applyTutorialPosition(state, action.progress);
      return applyTutorialProgress(state, action.progress);
    default:
      return state;
  }
}
