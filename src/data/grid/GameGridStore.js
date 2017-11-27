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
import Grid from "./BaseGrid";
import BaseGridHelper from "./BaseGridHelper";


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
      return BaseGridHelper.syncData(savedState);
    }

    return BaseGridHelper.syncData(GridStore.reset());
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.INIT_GRID:
        return this.initState();
      case ActionTypes.RESET_GRID:
        return GridStore.reset();
      case ActionTypes.APPLY_DATA:
        return GridStore.applyData(action);
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

  static applyData(action) {
    let {levelDataUnit} = action;
    return BaseGridHelper.syncData(levelDataUnit.get("grid"));
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

    return BaseGridHelper.syncData(state);
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

    return BaseGridHelper.syncData(state, false);
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

    return BaseGridHelper.syncData(state.set("detromino", detromino), false);
  }

  static removeDetromino(state) {
    return BaseGridHelper.syncData(state, false, BlockType.NONE);
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