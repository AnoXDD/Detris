/**
 * Created by Anoxic on 1/1/2018.
 *
 * A helper to determine if the user has finished this part of tutorial
 */

import BlockType from "../enum/BlockType";
import {x, y} from "./blockHelper";
import TutorialProgress from "../enum/TutorialProgress";

const ORDER = [
  TutorialProgress.TUTORIAL_INTRO,
  TutorialProgress.TUTORIAL_INTRO_GUIDE_TOGGLE,
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
  TutorialProgress.MECHANISM_DEMO_FREE_PLAY_INTRO,
  TutorialProgress.MECHANISM_DEMO_FREE_PLAY_UNDO_REDO,
  TutorialProgress.MECHANISM_DEMO_FREE_PLAY,
  TutorialProgress.FIRST_GAME_INTRO,
  TutorialProgress.FIRST_GAME_START,
];

/**
 * Returns if the user has finished this part of tutorial
 * @param {Array} blocks - an array of Block
 */
export function isDetrominoReachedHighlightArea(blocks) {
  // Get two types of blocks
  let highlights = blocks.filter(b => b.type === BlockType.HIGHLIGHT);
  if (!highlights.length) {
    // There is no highlight area
    return false;
  }

  let detrominos = blocks.filter(b => b.type === BlockType.DETROMINO);

  // Compare if they overlap
  for (let d of detrominos) {
    if (highlights.findIndex(b => x(b) === x(d) && y(b) === y(d)) === -1) {
      // Not found, so they are not overlapping
      return false;
    }
  }

  return true;
}


/**
 * Returns the next progress of current state. If it is the last progress,
 * return null
 */
export function nextTutorial(tutorial) {
  let progress = tutorial.get("progress");
  let index = ORDER.indexOf(progress);

  if (index === -1) {
    return null;
  }

  return ORDER[index + 1];
}

export function prevTutorial(tutorial) {
  let progress = tutorial.get("progress");
  let index = ORDER.indexOf(progress);

  if (index === -1) {
    return null;
  }

  return ORDER[index - 1];
}

export default {
  isDetrominoReachedHighlightArea,
  prevTutorial,
  nextTutorial,
};
