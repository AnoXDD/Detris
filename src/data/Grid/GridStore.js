/**
 * Created by Anoxic on 9/21/2017.
 */

import Immutable from "immutable";
import {ReduceStore} from "flux/utils";

import Rotation from "../Rotation";

import GridActionTypes from "./GridActionTypes";
import GridDispatcher from "./GridDispatcher";

import Detromino from "../Detromino/Detromino";
import DetrominoType from "../Detromino/DetrominoType";
import DetrominoShape from "../Detromino/DetrominoShape";
import GridSize from "./GridSize";

class GridStore extends ReduceStore {
  constructor() {
    super(GridDispatcher);
  }

  getInitialState() {
    let map = Immutable.Map();
    return map
      .set("grid", Immutable.Map())
      .set("detromino", new Detromino());
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
    let {detrominoType = DetrominoType.DEFAULT} = action;
    // todo: place the detromino in the middle
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
      case Rotation.NONE:
        rotation = Rotation.DEG_90;
        break;
      case Rotation.DEG_90:
        rotation = Rotation.DEG_180;
        break;
      case Rotation.DEG_180:
        rotation = Rotation.DEG_270;
        break;
      case Rotation.DEG_270:
        rotation = Rotation.NONE;
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

    // todo: Handle when the detromino is crossing the edge
    let targetX = detromino.get("x") + x;
    let targetY = detromino.get("y") + y;

    // Tests if it hits the left or upper edge
    if (targetX < 0 || targetY < 0) {
      return state;
    }

    let {type, rotation} = detromino;
    if (type === DetrominoType.DEFAULT) {
      return state;
    }

    let shape = DetrominoShape[type];
    let width = shape.length;
    let height = shape[0].length;

    // Swap width and height if shape is rotated
    if (rotation === Rotation.DEG_90 || rotation === Rotation.DEG_270) {
      let tmp = width;
      width = height;
      height = tmp;
    }

    // Tests if it hits the lower or right edge
    if (targetX + width > GridSize.WIDTH || targetY + height > GridSize.HEIGHT) {
      return state;
    }

    detromino = detromino
      .set("x", detromino.get("x") + x)
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