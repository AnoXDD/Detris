/**
 * Created by Anoxic on 9/21/2017.
 *
 * The list of actions that can be dispatched
 */

import DetrominoActionTypes from "./DetrominoActionTypes";
import DetrominoDispatcher from "./DetrominoDispatcher";

const Actions = {
  init(grid, detrominoType) {
    DetrominoDispatcher.dispatch({
      type: DetrominoActionTypes.INIT,
      detrominoType,
      grid,
    });
  },

  moveLeft(grid) {
    DetrominoDispatcher.dispatch({
      type: DetrominoActionTypes.LEFT,
      grid,
    });
  },

  moveRight(grid) {
    DetrominoDispatcher.dispatch({
      type: DetrominoActionTypes.RIGHT,
      grid,
    });
  },

  moveUp(grid) {
    DetrominoDispatcher.dispatch({
      type: DetrominoActionTypes.UP,
      grid,
    });
  },

  moveDown(grid) {
    DetrominoDispatcher.dispatch({
      type: DetrominoActionTypes.DOWN,
      grid,
    });
  },

  dropDown(grid) {
    DetrominoDispatcher.dispatch({
      type: DetrominoActionTypes.DROP,
      grid,
    })
  }
};

export default Actions;