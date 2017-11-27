/**
 * Created by Anoxic on 9/21/2017.
 *
 * A base reduce store for the game grid. Can be extended to be used in other
 * grids.
 */

import {ReduceStore} from "flux/utils";

import Algorithm from "../Algorithm";
import Rotation from "../enum/Rotation";
import GridSize from "./GridSize";
import BlockType from "../block/BlockType";
import ActionTypes from "../enum/ActionTypes";
import Dispatcher from "../Dispatcher";
import LocalStorageLoader from "../storeListener/LocalStorageLoader";
import Detromino from "../detromino/Detromino";
import DetrominoType from "../detromino/DetrominoType";
import BaseGridHelper from "./BaseGridHelper";
import GameGrid from "./GameGrid";


class GameGridStore extends ReduceStore {
  constructor() {
    super(Dispatcher);
  }

  static reset() {
    return new GameGrid();
  }

  getInitialState() {
    let savedState = LocalStorageLoader.loadGridFromLocalStorage();
    if (savedState) {
      return GameGridStore._syncData(savedState);
    }

    return GameGridStore._syncData(GameGridStore.reset());
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.INIT_GRID:
        return this.initState();
      case ActionTypes.RESET_GRID:
        return GameGridStore.reset();
      case ActionTypes.APPLY_DATA:
        return GameGridStore.applyData(action);
      case ActionTypes.NEXT_DETROMINO_IN_GAME:
        return GameGridStore.newDetromino(state, action);
      case ActionTypes.ROTATE:
        return GameGridStore.rotate(state);
      case ActionTypes.DETROMINO_MOVE_LEFT:
        return GameGridStore.move(state, {x: -1});
      case ActionTypes.DETROMINO_MOVE_RIGHT:
        return GameGridStore.move(state, {x: 1});
      case ActionTypes.DETROMINO_MOVE_UP:
        return GameGridStore.move(state, {y: -1});
      case ActionTypes.DETROMINO_MOVE_DOWN:
        return GameGridStore.move(state, {y: 1});
      case ActionTypes.REMOVE_DETROMINO:
        return GameGridStore.removeDetromino(state);
      case ActionTypes.SINK_FLOATING_BLOCK:
        return GameGridStore.sinkFloatingBlocks(state);
      case ActionTypes.SINK_TARGET_BLOCK:
        return GameGridStore.sinkTargetBlocks(state);
      default:
        return state;
    }
  }

  static applyData(action) {
    let {levelDataUnit} = action;
    return new GameGrid({
      grid: BaseGridHelper.syncData(levelDataUnit.get("grid")),
    });
  }

  static newDetromino(state, action) {
    let {detrominoType = DetrominoType.DEFAULT} = action;
    let detromino = new Detromino({
      id  : new Date().getTime(),
      type: detrominoType,
      x   : 0,
      y   : 0,
    });

    let grid = state.get("grid");
    grid = grid.set("detromino",
      detromino.set("x", detromino.getMiddleXPos()));

    return GameGridStore._syncData(state.set("grid", grid));
  }

  static rotate(state) {
    // todo check if detromino exists
    let grid = state.get("grid");
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

    grid = grid.set("detromino", detromino.set("rotation", rotation));

    return GameGridStore._syncData(state.set("grid", grid), false);
  }

  /**
   * Moves the block to certain position. If the operation is not doable,
   * return the original state
   * @param state - current state of detromino
   * @param delta - the position delta
   */
  static move(state, delta) {
    let grid = state.get("grid");
    let {x = 0, y = 0} = delta;
    let detromino = grid.get("detromino");

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
    if (Algorithm.isOverlapping(grid.get("matrix"), detromino)) {
      return state;
    }

    grid = grid.set("detromino", detromino);

    return GameGridStore._syncData(state.set("grid", grid), false);
  }

  static removeDetromino(state) {
    return GameGridStore._syncData(state, false, BlockType.NONE);
  }

  static sinkFloatingBlocks(state) {
    let grid = state.get("grid");
    let actualGrid = grid.get("grid");
    grid = grid.set("grid", Algorithm.sinkFloatingBlocks(actualGrid));

    return state.set("grid", grid);
  }

  static sinkTargetBlocks(state) {
    let grid = state.get("grid");
    let actualGrid = grid.get("grid");
    grid = grid.set("grid", Algorithm.sinkTargetBlocks(actualGrid));

    return state.set("grid", grid);
  }

  /**
   * A helper to sync the class
   * @param state
   * @param {boolean} updateMatrix - should the matrix be updated. Set to false
   *   if the grid is not changed
   * @param {string|BlockType} blockType
   * @param {Immutable.Set} detrominoTargets - optional targets from level
   *   editor to mark detromino blocks as target
   * @private
   */
  static _syncData(state,
                   updateMatrix = true,
                   blockType = BlockType.DETROMINO,
                   detrominoTargets) {
    return state.set("grid",
      BaseGridHelper.syncData(state.get("grid"),
        updateMatrix,
        blockType,
        detrominoTargets));
  }

  initState() {
    return this.getInitialState();
  }
}

export default new GameGridStore();