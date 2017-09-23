/**
 * Created by Anoxic on 9/21/2017.
 *
 * The list of actions that can be dispatched
 */

import GridDispatcher from "../Grid/GridDispatcher";

import DetrominoActionTypes from "./DetrominoActionTypes";

const Actions = {
  init(grid, detrominoType) {
    GridDispatcher.dispatch({
      type: DetrominoActionTypes.INIT_GRID,
      detrominoType,
      grid,
    });
  },

  moveLeft(grid) {
    GridDispatcher.dispatch({
      type: DetrominoActionTypes.LEFT,
      grid,
    });
  },

  moveRight(grid) {
    GridDispatcher.dispatch({
      type: DetrominoActionTypes.RIGHT,
      grid,
    });
  },

  moveUp(grid) {
    GridDispatcher.dispatch({
      type: DetrominoActionTypes.UP,
      grid,
    });
  },

  moveDown(grid) {
    GridDispatcher.dispatch({
      type: DetrominoActionTypes.DOWN,
      grid,
    });
  },

  dropDown(grid) {
    GridDispatcher.dispatch({
      type: DetrominoActionTypes.DROP,
      grid,
    })
  }
};

export default Actions;