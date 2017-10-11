/**
 * Created by Anoxic on 9/21/2017.
 */

import {ReduceStore} from "flux/utils";

import Algorithm from "../Algorithm";
import Rotation from "../enum/Rotation";
import GridSize from "./GridSize";
import BlockType from "../block/BlockType";
import Block from "../block/Block";
import ActionTypes from "../enum/ActionTypes";
import Dispatcher from "../Dispatcher";
import LocalStorageLoader from "../localStorage/LocalStorageLoader";
import Detromino from "../detromino/Detromino";
import DetrominoType from "../detromino/DetrominoType";
import DetrominoShape from "../detromino/DetrominoShape";
import Grid from "./Grid";
import GridStore from "./GridStoreClass";


class GridEditorStore extends GridStore {
  constructor() {
    super(Dispatcher);
  }

  static reset() {
    return new Grid();
  }

  getInitialState() {
    // let savedState = LocalStorageLoader.loadGridFromLocalStorage();
    // if (savedState) {
    //   return GridEditorStore.applyDetromino(savedState);
    // }

    return GridEditorStore.reset();
  }

  reduce(state, action) {
    // todo don't do anything if current game is not using this grid
    switch (action.type) {
      case ActionTypes.INIT_GRID:
        return this.initState();
      case ActionTypes.RESET_GRID:
        return GridEditorStore.reset();
      case ActionTypes.APPLY_DATA:
        return GridEditorStore.applyData(state, action);
      case ActionTypes.NEXT_DETROMINO:
        return GridEditorStore.nextDetromino(state, action);
      case ActionTypes.ROTATE:
        return GridEditorStore.rotate(state);
      case ActionTypes.MOVE_LEFT:
        return GridEditorStore.moveX(state, -1);
      case ActionTypes.MOVE_RIGHT:
        return GridEditorStore.moveX(state, 1);
      case ActionTypes.MOVE_UP:
        return GridEditorStore.move(state, {y: -1});
      case ActionTypes.MOVE_DOWN:
        return GridEditorStore.move(state, {y: 1});
      case ActionTypes.REMOVE_DETROMINO:
        return GridEditorStore.removeDetromino(state);
      case ActionTypes.SINK_FLOATING_BLOCK:
        return GridEditorStore.sinkFloatingBlocks(state);
      case ActionTypes.SINK_TARGET_BLOCK:
        return GridEditorStore.sinkTargetBlocks(state);
      default:
        return state;
    }
  }

  static applyData(state, action) {
    let {blockList} = action;

    return state
      .set("detromino", null)
      .set("grid", blockList.map(block => new Block(block)));
  }

  static nextDetromino(state, action) {
    state = GridStore.applyDetromino(state, BlockType.ORIGINAL);

    let {detrominoType = DetrominoType.DEFAULT} = action;
    let detromino = new Detromino({
      id  : new Date().getTime(),
      type: detrominoType,
    });

    detromino = detromino.set("x", detromino.getMiddleXPos());

    state = state.set("detromino",
      Algorithm.getLowestValidPosition(state.get("grid"), detromino)
    );

    return GridStore.applyDetromino(state);
  }

  static rotate(state) {
    // todo check if detromino exists

    let detromino = state.get("detromino");
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

    state = state.set("detromino", detromino.set("rotation", rotation));

    return GridStore.applyDetromino(state);
  }

  /**
   * Moves the block horizontally. If the operation is not doable, return the
   * original state
   * @param state {Grid} current state of detromino
   * @param delta {Number} the delta of x
   */
  static moveX(state, delta) {
    let detromino = state.get("detromino");

    let targetX = detromino.get("x") + delta;

    // Tests if it hits the left or right edge
    if (targetX < 0 || targetX + detromino.width() > GridSize.WIDTH) {
      return state;
    }

    let target = Algorithm.getLowestValidPosition(state.get("grid"),
      detromino.set("x", targetX));
    if (!target) {
      return state;
    }

    return GridStore.applyDetromino(state.set("detromino", target));
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
      [width, height] = [height, width];
    }

    // Tests if it hits the lower or right edge
    if (targetX + width > GridSize.WIDTH || targetY + height > GridSize.HEIGHT) {
      return state;
    }

    detromino = detromino
      .set("x", detromino.get("x") + x)
      .set("y", detromino.get("y") + y);

    // Tests if the detromino is running into target blocks
    if (Algorithm.isOverlapping(state.get("grid"), detromino)) {
      return false;
    }

    return GridEditorStore.applyDetromino(state.set("detromino", detromino));
  }

  static removeDetromino(state) {
    return GridStore.applyDetromino(state, BlockType.NONE);
  }

  static sinkFloatingBlocks(state) {
    let grid = state.get("grid");

    return state.set("grid", Algorithm.sinkFloatingBlocks(grid));
  }

  static sinkTargetBlocks(state) {
    let grid = state.get("grid");

    return state.set("grid", Algorithm.sinkTargetBlocks(grid));
  }

  initState() {
    return this.getInitialState();
  }
}

export default new GridEditorStore();