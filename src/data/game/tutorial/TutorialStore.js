/**
 * Created by Anoxic on 12/31/2017.
 * A store for the tutorial state
 */

import {ReduceStore} from "flux/utils";

import Dispatcher from "../../Dispatcher";

import ActionTypes from "../../enum/ActionTypes";
import Actions from "../../Actions";
import TutorialProgress from "../../enum/TutorialProgress";
import TutorialState from "./TutorialState";
import TutorialGuidePosition from "../../enum/TutorialGuidePosition";
import OverlayType from "../../enum/OverlayTypes";

class TutorialStore extends ReduceStore {
  constructor() {
    super(Dispatcher);
  }

  static reset() {
    return new TutorialState();
  }

  getInitialState() {
    return TutorialStore.reset();
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.SET_TUTORIAL_PROGRESS:
        state = TutorialStore.applyTutorialPosition(state, action.progress);
        return TutorialStore.applyTutorialProgress(state, action.progress);
      default:
        return state;
    }
  }

  static applyTutorialPosition(state, progress) {
    switch (progress) {
      case TutorialProgress.GAME_INTRO:
      case TutorialProgress.GAME_INTRO_GUIDE_TOGGLE:
        return state.set("position", TutorialGuidePosition.BOTTOM);
      case TutorialProgress.MOVE_DETROMINO_INTRO:
        return state.set("position", TutorialGuidePosition.BOTTOM);
      case TutorialProgress.MOVE_DETROMINO_LEFT_RIGHT:
        return state.set("position", TutorialGuidePosition.CENTER);
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
      case TutorialProgress.MECHANISM_DEMO_FREE_PLAY_START:
      case TutorialProgress.MECHANISM_DEMO_FREE_PLAY_UNDO_REDO:
      case TutorialProgress.MECHANISM_DEMO_FREE_PLAY:
      case TutorialProgress.FIRST_GAME_INTRO:
      case TutorialProgress.FIRST_GAME_START:
      case TutorialProgress.FIRST_GAME_DONE:
        return state.set("progress", progress);
      default:
        return state;
    }
  }

  static applyTutorialProgress(state, progress) {
    switch (progress) {
      case TutorialProgress.GAME_INTRO:
      case TutorialProgress.GAME_INTRO_GUIDE_TOGGLE:
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
      case TutorialProgress.MECHANISM_DEMO_FREE_PLAY_START:
      case TutorialProgress.MECHANISM_DEMO_FREE_PLAY_UNDO_REDO:
      case TutorialProgress.MECHANISM_DEMO_FREE_PLAY:
      case TutorialProgress.FIRST_GAME_INTRO:
      case TutorialProgress.FIRST_GAME_START:
      case TutorialProgress.FIRST_GAME_DONE:
        return state.set("progress", progress);
      default:
        return state;
    }
  }
}

export default new TutorialStore();