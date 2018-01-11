/**
 * Created by Anoxic on 1/10/2018.
 *
 * A helper file to determine the state of history in grid store
 */

import GameGridStore from "./game/GameGridStore";

const GridHistoryHelper = {
  /**
   * Returns if the grid can be undone in the actual game
   */
  canUndoInGame() {
    return !GameGridStore.getState().get("history").isPastChangesEmpty();
  },

  /**
   * See comments in canUndoInGame
   */
  canRedoInGame() {
    return !GameGridStore.getState().get("history").isFutureChangesEmpty();
  },
};

export default GridHistoryHelper;
