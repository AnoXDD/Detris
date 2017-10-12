/**
 * Created by Anoxic on 9/21/2017.
 */

import Algorithm from "../Algorithm";
import Rotation from "../enum/Rotation";
import GridSize from "../grid/GridSize";
import BlockType from "../block/BlockType";
import ActionTypes from "../enum/ActionTypes";
import Dispatcher from "../Dispatcher";
import Detromino from "../detromino/Detromino";
import DetrominoType from "../detromino/DetrominoType";
import DetrominoShape from "../detromino/DetrominoShape";
import GridStore from "../grid/GridStoreClass";
import LevelEditorGrid from "./LevelEditorGrid";


class LevelEditorGridStore extends GridStore {
  constructor() {
    super(Dispatcher);
  }

  static reset() {
    return new LevelEditorGrid();
  }

  getInitialState() {
    // let savedState = LocalStorageLoader.loadGridFromLocalStorage();
    // if (savedState) {
    //   return LevelEditorGridStore.applyDetromino(savedState);
    // }

    return LevelEditorGridStore.reset();
  }

  reduce(state, action) {
    // todo don't do anything if current game is not using this grid
    switch (action.type) {
      case ActionTypes.INIT_GRID:
        return this.initState();
      case ActionTypes.RESET_GRID:
        return LevelEditorGridStore.reset();
      case ActionTypes.NEXT_DETROMINO:
        return LevelEditorGridStore.nextDetromino(state, action);
      case ActionTypes.ROTATE:
        return LevelEditorGridStore.rotate(state);
      case ActionTypes.MOVE_LEFT:
        return LevelEditorGridStore.moveX(state, -1);
      case ActionTypes.MOVE_RIGHT:
        return LevelEditorGridStore.moveX(state, 1);
      case ActionTypes.MOVE_UP:
        return LevelEditorGridStore.move(state, {y: -1});
      case ActionTypes.MOVE_DOWN:
        return LevelEditorGridStore.move(state, {y: 1});
      case ActionTypes.SET_CURRENT_BLOCK:
        return LevelEditorGridStore.setCurrentBlock(state, action);
      case ActionTypes.GRID_EDITOR_MOVE_LEFT:
        return LevelEditorGridStore.moveGrid(state, {x: -1});
      case ActionTypes.GRID_EDITOR_MOVE_RIGHT:
        return LevelEditorGridStore.moveGrid(state, {x: 1});
      case ActionTypes.GRID_EDITOR_MOVE_UP:
        return LevelEditorGridStore.moveGrid(state, {y: -1});
      case ActionTypes.GRID_EDITOR_MOVE_DOWN:
        return LevelEditorGridStore.moveGrid(state, {y: 1});
      default:
        return state;
    }
  }

  static nextDetromino(state, action) {
    let {data} = state;

    data = GridStore.applyDetromino(data, BlockType.ORIGINAL);

    let {detrominoType = DetrominoType.DEFAULT} = action;
    let detromino = new Detromino({
      id  : new Date().getTime(),
      type: detrominoType,
    });

    detromino = detromino.set("x", detromino.getMiddleXPos());

    data = data.set("detromino",
      Algorithm.getLowestValidPosition(data.get("grid"), detromino)
    );

    return state.set("data", GridStore.applyDetromino(data));
  }

  static rotate(state) {
    // todo check if detromino exists
    // todo change the position if rotate causes overlap
    let {data} = state;

    let detromino = data.get("detromino");
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

    data = data.set("detromino", detromino.set("rotation", rotation));

    return state.set("data", GridStore.applyDetromino(data));
  }

  /**
   * Moves the block horizontally. If the operation is not doable, return the
   * original state
   * @param state {LevelEditorGrid} current state of detromino
   * @param delta {Number} the delta of x
   */
  static moveX(state, delta) {
    let data = state.get("data");

    let detromino = data.get("detromino");

    let targetX = detromino.get("x") + delta;

    // Tests if it hits the left or right edge
    if (targetX < 0 || targetX + detromino.width() > GridSize.WIDTH) {
      return data;
    }

    let target = Algorithm.getLowestValidPosition(data.get("grid"),
      detromino.set("x", targetX));
    if (!target) {
      return data;
    }

    return state.set("data",
      GridStore.applyDetromino(data.set("detromino", target)));
  }

  /**
   * Moves the block to certain position. If the operation is not doable,
   * return the original state
   * @param state - current state of detromino
   * @param delta - the position delta
   */
  static move(state, delta) {
    return state;
  }

  /**
   * Moves the grid of the block target whose type is to be changed
   */
  static moveGrid(state, delta) {
    // todo implement this
  }

  static setCurrentBlock(state, action) {
    let gridState = state.get("state");

    return state.set("data", gridState.set("blockType", action.blockType));
  }

  initState() {
    return this.getInitialState();
  }
}

export default new LevelEditorGridStore();