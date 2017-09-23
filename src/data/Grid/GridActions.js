/**
 * Created by Anoxic on 9/21/2017.
 *
 * The list of actions that can be dispatched
 */

import GridActionTypes from "./GridActionTypes";
import GridDispatcher from "./GridDispatcher";

const Actions = {
  init(width, height) {
    GridDispatcher.dispatch({
      type: GridActionTypes.INIT_GRID,
      width,
      height,
    });
  },

  newDetromino(detrominoType) {
    GridDispatcher.dispatch({
      type: GridActionTypes.NEW_DETROMINO,
      detrominoType,
    });
  },

  moveLeft() {
    GridDispatcher.dispatch({
      type: GridActionTypes.LEFT,
    });
  },

  moveRight() {
    GridDispatcher.dispatch({
      type: GridActionTypes.RIGHT,
    });
  },

  moveUp() {
    GridDispatcher.dispatch({
      type: GridActionTypes.UP,
    });
  },

  moveDown() {
    GridDispatcher.dispatch({
      type: GridActionTypes.DOWN,
    });
  },

  dropDown() {
    GridDispatcher.dispatch({
      type: GridActionTypes.DROP,
    })
  },
};

export default Actions;