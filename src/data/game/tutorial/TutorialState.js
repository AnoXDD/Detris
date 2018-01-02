/**
 * Created by Anoxic on 12/31/2017.
 *
 * Stores the state of current tutorial. Also acts as a helper for next state
 */

import Immutable from "immutable";
import TutorialProgress from "../../enum/TutorialProgress";
import TutorialGuidePosition from "../../enum/TutorialGuidePosition";

const ORDER = [
  TutorialProgress.GAME_INTRO,
  TutorialProgress.GAME_INTRO_GUIDE_TOGGLE,
  TutorialProgress.MOVE_DETROMINO_INTRO,
  TutorialProgress.MOVE_DETROMINO_LEFT_RIGHT,
  TutorialProgress.MOVE_DETROMINO_NO_OVERLAP,
  TutorialProgress.MOVE_DETROMINO_ROTATE,
  TutorialProgress.MECHANISM_INTRO,
  TutorialProgress.MECHANISM_DEMO_INTRO,
  TutorialProgress.MECHANISM_DEMO_I_INTRO,
  TutorialProgress.MECHANISM_DEMO_I_FALLING,
  TutorialProgress.MECHANISM_DEMO_I_APPLYING,
  TutorialProgress.MECHANISM_DEMO_I_RESULT,
  TutorialProgress.MECHANISM_DEMO_T_INTRO,
  TutorialProgress.MECHANISM_DEMO_T_FALLING,
  TutorialProgress.MECHANISM_DEMO_T_FALLING_EXPLANATION,
  TutorialProgress.MECHANISM_DEMO_T_APPLYING,
  TutorialProgress.MECHANISM_DEMO_T_TARGET_FALLING,
  TutorialProgress.MECHANISM_DEMO_T_TARGET_BLOCKS,
  TutorialProgress.MECHANISM_DEMO_T_RESULT,
  TutorialProgress.MECHANISM_DEMO_FLOOR_INTRO,
  TutorialProgress.MECHANISM_DEMO_FLOOR_RESULT,
  TutorialProgress.MECHANISM_DEMO_FREE_PLAY_START,
  TutorialProgress.MECHANISM_DEMO_FREE_PLAY_UNDO_REDO,
  TutorialProgress.MECHANISM_DEMO_FREE_PLAY,
  TutorialProgress.FIRST_GAME_INTRO,
  TutorialProgress.FIRST_GAME_START,
  TutorialProgress.FIRST_GAME_DONE,
];


const TutorialStateRecord = Immutable.Record({
  progress: TutorialProgress.GAME_INTRO,
  position: TutorialGuidePosition.TOP,
});

export default class TutorialState extends TutorialStateRecord {
  /**
   * Returns the next progress of current state. If it is the last progress,
   * return null
   */
  next() {
    let progress = this.get("progress");
    let index = ORDER.indexOf(progress);

    if (index === -1) {
      return null;
    }

    return ORDER[index + 1];
  }
};