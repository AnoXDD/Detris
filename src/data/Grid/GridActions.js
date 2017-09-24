/**
 * Created by Anoxic on 9/21/2017.
 *
 * The list of actions that can be dispatched
 */

import GridActionTypes from "./GridActionTypes";
import GridDispatcher from "./GridDispatcher";
import DetrominoType from "../Detromino/DetrominoType";

const GridActions = {
  init(width, height) {
    GridDispatcher.dispatch({
      type: GridActionTypes.INIT_GRID,
      width,
      height,
    });
  },

  newDetromino(detrominoType = DetrominoType.T) {
    GridDispatcher.dispatch({
      type: GridActionTypes.NEXT_DETROMINO,
      detrominoType,
    });
  },

  // Debug only
  newRandomDetromino() {
    let shapes = Object.keys(DetrominoType).slice(1);
    let detrominoType = shapes[parseInt(Math.random() * shapes.length, 10)];

    GridDispatcher.dispatch({
      type: GridActionTypes.NEXT_DETROMINO,
      detrominoType,
    })
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

  rotate() {
    GridDispatcher.dispatch({
      type: GridActionTypes.ROTATE,
    });
  },

  // Remove the current detromino block from the grid
  removeDetromino() {
    GridDispatcher.dispatch({
      type: GridActionTypes.REMOVE_DETROMINO,
    });
  },

  sinkFloatingBlocks() {
    GridDispatcher.dispatch({
      type: GridActionTypes.SINK_FLOATING_BLOCK,
    });
  },

  sinkTargetBlocks() {
    GridDispatcher.dispatch({
      type: GridActionTypes.SINK_TARGET_BLOCK,
    });
  },
};

export default GridActions;