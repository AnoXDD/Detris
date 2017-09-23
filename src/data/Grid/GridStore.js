/**
 * Created by Anoxic on 9/21/2017.
 */

import Immutable from "immutable";
import {ReduceStore} from "flux/utils";

import GridActionTypes from "./GridActionTypes";
import GridDispatcher from "./GridDispatcher";

import DetrominoContext from "../Detromino/DetrominoContext";
import Detromino from "../Detromino/Detromino";

class GridStore extends ReduceStore {
  constructor() {
    super(GridDispatcher);
  }

  getInitialState() {
    let map = Immutable.Map();
    return map.set("grid", Immutable.Map()).set("detromino", null);
  }

  reduce(state, action) {
    switch (action.type) {
      case GridActionTypes.INIT_GRID:
        return this.initState(action);
      case GridActionTypes.NEW_DETROMINO:
        return GridStore.newDetromino(state, action);
      case GridActionTypes.ROTATE:
        return GridStore.rotate(state, action);
      case GridActionTypes.LEFT:
        return GridStore.move(state, {x: -1});
      case GridActionTypes.RIGHT:
        return GridStore.move(state, {x: 1});
      case GridActionTypes.UP:
        return GridStore.move(state, {y: -1});
      case GridActionTypes.DOWN:
        return GridStore.move(state, {y: 1});
      case GridActionTypes.DROP:
        return GridStore.drop(state);
      default:
        return state;
    }
  }

  static newDetromino(state, action) {
    let {detrominoType = DetrominoContext.Type.DEFAULT} = action;
    // todo: place the detromino in the middle and only show the bottom line
    state = state.set("detromino", new Detromino({
      id  : new Date().getTime(),
      type: detrominoType,
      x   : 0,
      y   : 0,
    }));

    return GridStore.applyDetromino(state);
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
   * @param delta - the position delta
   */
  static move(state, delta) {
    let {x = 0, y = 0} = delta;
    let detromino = state.get("detromino");
    // todo: handle the case where the detromino is going to hit the edge

    detromino = detromino.set("x", detromino.get("x") + x)
      .set("y", detromino.get("y") + y);

    return GridStore.applyDetromino(state.set("detromino", detromino));
  }

  /**
   * Drop the detromino all the way down until it has the first collision with
   * the grid
   * @param state - current state of detromino
   */
  static drop(state) {
    return state;
  }

  /**
   * Apples the detromino to current grid state. This function must be called
   * every time the detromino is changed
   */
  static applyDetromino(state) {
    // Process the raw detromino in the state
    let detromino = state.get("detromino");
    let shape = detromino.getRotatedBlocks();

    // Apply the processed detromino to the grid
    // todo: handle the case if there is a conflict
    return state.set("grid", state.get("grid").merge(shape));
  }

  initState(action) {
    return this.getInitialState();
  }
}

export default new GridStore();