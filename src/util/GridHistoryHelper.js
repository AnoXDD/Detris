/**
 * Created by Anoxic on 1/10/2018.
 *
 * A helper file to determine the state of history in grid store
 */

import store from "../store/store";

const GridHistoryHelper = {
  /**
   * Returns if the grid can be undone in the actual game
   */
  canUndoInGame() {
    return true || !store.getState().gamePanel.get("history").isPastChangesEmpty();
  },

  /**
   * See comments in canUndoInGame
   */
  canRedoInGame() {
    return true || !store.getState().gamePanel.get("history").isFutureChangesEmpty();
  },
};

export default GridHistoryHelper;
