/**
 * Created by Anoxic on 9/21/2017.
 *
 * The list of actions that can be dispatched
 */

import ActionTypes from "./ActionTypes";
import Algorithm from "./Algorithm";
import Dispatcher from "./Dispatcher";
import QueueStore from "./queue/QueueStore";

const Actions = {
  init(width, height) {
    Dispatcher.dispatch({
      type: ActionTypes.INIT_GRID,
      width,
      height,
    });
  },

  resetGrid() {
    Dispatcher.dispatch({
      type: ActionTypes.RESET_GRID,
    });
  },

  /**
   * Starts a new game with grid width, height and queue, grid
   * @param width - the grid width
   * @param height - the grid height
   * @param detrominoList - the queue represented by a native list of objects
   *   that can be converted to Detromino
   * @param blockList - the grid represented by a native list of objects that
   *   can be converted to Block
   */
  apply(width, height, detrominoList, blockList) {
    Actions.init(width, height);

    Dispatcher.dispatch({
      type: ActionTypes.APPLY_DATA,
      blockList,
      detrominoList,
    })
  },

  nextDetromino() {
    Actions.sinkFloatingBlocks();
    Actions.sinkTargetBlocks();

    let detrominoType = QueueStore.getState().last();

    Dispatcher.dispatch({
      type: ActionTypes.NEXT_DETROMINO,
      detrominoType,
    });
  },

  // Debug only
  debug__newRandomDetromino() {
    Actions.sinkFloatingBlocks();
    Actions.sinkTargetBlocks();

    let detrominoType = Algorithm.generateRandomDetrominoType();

    Dispatcher.dispatch({
      type: ActionTypes.NEXT_DETROMINO,
      detrominoType,
    })
  },

  debug__addDetrominoToQueue(detrominoType = Algorithm.generateRandomDetrominoType()) {
    Dispatcher.dispatch({
      type: ActionTypes.ADD_DETROMINO_TO_QUEUE,
      detrominoType,
    });
  },

  moveLeft() {
    Dispatcher.dispatch({
      type: ActionTypes.LEFT,
    });
  },

  moveRight() {
    Dispatcher.dispatch({
      type: ActionTypes.RIGHT,
    });
  },

  moveUp() {
    Dispatcher.dispatch({
      type: ActionTypes.UP,
    });
  },

  moveDown() {
    Dispatcher.dispatch({
      type: ActionTypes.DOWN,
    });
  },

  dropDown() {
    Dispatcher.dispatch({
      type: ActionTypes.DROP,
    })
  },

  rotate() {
    Dispatcher.dispatch({
      type: ActionTypes.ROTATE,
    });
  },

  // Remove the current detromino block from the grid
  removeDetromino() {
    Dispatcher.dispatch({
      type: ActionTypes.REMOVE_DETROMINO,
    });
  },

  sinkFloatingBlocks() {
    Dispatcher.dispatch({
      type: ActionTypes.SINK_FLOATING_BLOCK,
    });
  },

  sinkTargetBlocks() {
    Dispatcher.dispatch({
      type: ActionTypes.SINK_TARGET_BLOCK,
    });
  },
};

export default Actions;