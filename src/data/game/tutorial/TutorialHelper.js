/**
 * Created by Anoxic on 1/1/2018.
 *
 * A helper to determine if the user has finished this part of tutorial
 */

import BlockType from "../../block/BlockType";
const TutorialHelper = {
  /**
   * Returns if the user has finished this part of tutorial
   * @param {GameGrid} state
   */
  isDetrominoReachedHighlightArea(state) {
    let blocks = state.get("grid").get("grid").valueSeq().toArray();

    // Get two types of blocks
    let highlights = blocks.filter(b => b.type === BlockType.HIGHLIGHT);
    if (!highlights.length) {
      // There is no highlight area
      return false;
    }

    let detrominos = blocks.filter(b => b.type === BlockType.DETROMINO);

    // Compare if they overlap
    for (let d of detrominos) {
      if (highlights.findIndex(b => b.x() === d.x() && b.y() === d.y()) === -1) {
        // Not found, so they are not overlapping
        return false;
      }
    }

    return true;
  },
};

export default TutorialHelper;
