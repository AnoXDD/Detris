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
import Grid from "./Grid";
import Color from "../enum/Color";


export default class GridStore extends ReduceStore {
  constructor() {
    super(Dispatcher);
  }

  static reset() {
    return new Grid();
  }

  getInitialState() {
    let savedState = LocalStorageLoader.loadGridFromLocalStorage();
    if (savedState) {
      return GridStore.syncData(savedState);
    }

    return GridStore.syncData(GridStore.reset());
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.INIT_GRID:
        return this.initState();
      case ActionTypes.RESET_GRID:
        return GridStore.reset();
      case ActionTypes.APPLY_DATA:
        return GridStore.applyData(state, action);
      case ActionTypes.NEXT_DETROMINO_IN_GAME:
        return GridStore.newDetromino(state, action);
      case ActionTypes.ROTATE:
        return GridStore.rotate(state);
      case ActionTypes.DETROMINO_MOVE_LEFT:
        return GridStore.move(state, {x: -1});
      case ActionTypes.DETROMINO_MOVE_RIGHT:
        return GridStore.move(state, {x: 1});
      case ActionTypes.DETROMINO_MOVE_UP:
        return GridStore.move(state, {y: -1});
      case ActionTypes.DETROMINO_MOVE_DOWN:
        return GridStore.move(state, {y: 1});
      case ActionTypes.REMOVE_DETROMINO:
        return GridStore.removeDetromino(state);
      case ActionTypes.SINK_FLOATING_BLOCK:
        return GridStore.sinkFloatingBlocks(state);
      case ActionTypes.SINK_TARGET_BLOCK:
        return GridStore.sinkTargetBlocks(state);
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

  static newDetromino(state, action) {
    let {detrominoType = DetrominoType.DEFAULT} = action;
    let detromino = new Detromino({
      id  : new Date().getTime(),
      type: detrominoType,
      x   : 0,
      y   : 0,
    });

    state = state.set("detromino",
      detromino.set("x", detromino.getMiddleXPos()));

    return GridStore.syncData(state);
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

    return GridStore.syncData(state, false);
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

    let {type} = detromino;
    if (type === DetrominoType.DEFAULT) {
      return state;
    }

    let width = detromino.width();
    let height = detromino.height();

    // Tests if it hits the lower or right edge
    if (targetX + width > GridSize.WIDTH || targetY + height > GridSize.HEIGHT) {
      return state;
    }

    detromino = detromino
      .set("x", detromino.get("x") + x)
      .set("y", detromino.get("y") + y);

    // Tests if the detromino is running into target blocks
    if (Algorithm.isOverlapping(state.get("matrix"), detromino)) {
      return state;
    }

    return GridStore.syncData(state.set("detromino", detromino), false);
  }

  /**
   * Syncs the data of states. This includes:
   *  1) Applying detromino to the state
   *  2) Updating the read only 2d array converted from grid
   *
   * @param state
   * @param {boolean} updateMatrix - should the matrix be updated. Set to false
   *   if the grid is not changed
   * @param {string|BlockType} blockType
   * @param {Immutable.Set} detrominoTargets - optional targets from level
   *   editor to mark detromino blocks as target
   */
  static syncData(state,
                  updateMatrix = true,
                  blockType = BlockType.DETROMINO,
                  detrominoTargets) {
    state = GridStore._applyDetromino(state, blockType, detrominoTargets);

    if (!updateMatrix) {
      return state;
    }

    state = GridStore.syncGridToMatrix(state);

    return state;
  }

  /**
   * Converts the grid to a 2d vanilla javascript array. This function should
   * only be called when the grid is changed
   * @param state
   */
  static syncGridToMatrix(state) {
    return state.set("matrix", Algorithm.convertGridToArray(state.get("grid")));
  }

  /**
   * Applies the detromino to current grid state. This function must be called
   * every time the detromino is changed
   * @param state
   * @param {string|BlockType} blockType - the block type that the detromino is
   *   converting to
   * @param {Immutable.Set} detrominoTargets - optional targets from level
   *   editor to mark detromino blocks as target
   * @private
   */
  static _applyDetromino(state,
                         blockType = BlockType.DETROMINO,
                         detrominoTargets) {
    // Process the raw detromino in the state
    let detromino = state.get("detromino");
    if (!detromino) {
      return state;
    }

    let shape = detromino.getRotatedBlocks(blockType,
      Color.SOLID,
      detrominoTargets);

    // Apply the processed detromino to the grid
    return state.set("grid", state.get("grid").merge(shape));
  }

  static removeDetromino(state) {
    return GridStore.syncData(state, false, BlockType.NONE);
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