/**
 * Created by Anoxic on 9/21/2017.
 */

import {ReduceStore} from "flux/utils";

import GridDispatcher from "../Grid/GridDispatcher";

import DetrominoActionTypes from "./DetrominoActionTypes";
import DetrominoContext from "./DetrominoContext";
import Detromino from "./Detromino";

class DetrominoStore extends ReduceStore {
  constructor() {
    super(GridDispatcher);
  }

  getInitialState() {
    return null;
  }

  reduce(state, action) {
    switch (action.type) {
      case DetrominoActionTypes.INIT_GRID:
        return DetrominoStore.initState(action);
      case DetrominoActionTypes.ROTATE:
        return DetrominoStore.rotate(state, action);
      case DetrominoActionTypes.LEFT:
        return DetrominoStore.move(state, action.grid, {x: -1});
      case DetrominoActionTypes.RIGHT:
        return DetrominoStore.move(state, action.grid, {x: 1});
      case DetrominoActionTypes.UP:
        return DetrominoStore.move(state, action.grid, {y: 1});
      case DetrominoActionTypes.DOWN:
        return DetrominoStore.move(state, action.grid, {y: -1});
      case DetrominoActionTypes.DROP:
        return DetrominoStore.drop(state, action.grid);
      default:
        return state;
    }
  }

  static initState(action) {
    let {detrominoType = DetrominoContext.Type.DEFAULT, grid} = action;
    // todo: place the detromino in the middle and only show the bottom line
    return new Detromino({
      id  : new Date().getTime(),
      type: detrominoType,
      x   : 0,
      y   : 0,
    });
  }

  static rotate(state, action) {
    let {detromino} = action;
    let rotation = detromino.get("rotation");

    switch (rotation) {
      case DetrominoContext.rotation.NONE:
        rotation = DetrominoContext.rotation.DEG_90;
        break;
      case DetrominoContext.rotation.DEG_90:
        rotation = DetrominoContext.rotation.DEG_180;
        break;
      case DetrominoContext.rotation.DEG_180:
        rotation = DetrominoContext.rotation.DEG_270;
        break;
      case DetrominoContext.rotation.DEG_270:
        rotation = DetrominoContext.rotation.NONE;
        break;
      default:
    }

    return state.set("rotation", rotation);
  }

  /**
   * Moves the block to certain position. If the operation is not doable,
   * return the original state
   * @param state - current state of detromino
   * @param grid - the grid that holds the detromino
   * @param delta - the position delta
   */
  static move(state, grid, delta) {
    let {x = 0, y = 0} = delta;

    // todo: handle the case where the detromino is going to hit the edge

    return state.set("x", state.get("x") + x)
      .set("y", state.get("y") + y);
  }

  /**
   * Drop the detromino all the way down until it has the first collision with
   * the grid
   * @param state - current state of detromino
   * @param grid - the grid that holds teh detromino
   */
  static drop(state, grid) {
    return state;
  }
}

export default new DetrominoStore();