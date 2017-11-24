/**
 * Created by Anoxic on 11/24/2017.
 *
 * A helper to determine if the game shuold be ended
 */

import GridStore from "../grid/GridStore";
import QueueStore from "../queue/QueueStore";

const EndGameHelper = {
  /**
   * Returns if the level has been solved (i.e. both queue and grid are empty)
   */
  isLevelSolved() {
    return QueueStore.getState().isEmpty() && GridStore.getState().isEmpty();
  },

  /**
   * Returns if the player runs out of the queue but has blocks not eliminated
   */
  isLevelFailed() {
    return QueueStore.getState().isEmpty() && !GridStore.getState().isEmpty();
  }
};

export default EndGameHelper;
