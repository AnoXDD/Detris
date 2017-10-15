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
    //   return LevelEditorGridStore._syncData(savedState);
    // }

    return LevelEditorGridStore.reset();
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.INIT_GRID:
        return this.initState();
      case ActionTypes.RESET_GRID:
        return LevelEditorGridStore.reset();
      case ActionTypes.NEXT_DETROMINO_IN_EDITOR:
        return LevelEditorGridStore.nextDetromino(state, action);
      case ActionTypes.ROTATE:
        return LevelEditorGridStore.rotate(state);
      case ActionTypes.EDITOR_DETROMINO_MOVE_LEFT:
        return LevelEditorGridStore.moveX(state, -1);
      case ActionTypes.EDITOR_DETROMINO_MOVE_RIGHT:
        return LevelEditorGridStore.moveX(state, 1);
      // case ActionTypes.DETROMINO_MOVE_UP:
      //   return LevelEditorGridStore.moveDetrominoInGame(state, {y: -1});
      // case ActionTypes.DETROMINO_MOVE_DOWN:
      //   return LevelEditorGridStore.moveDetrominoInGame(state, {y: 1});
      case ActionTypes.ENABLE_BLOCK_EDITING:
        return LevelEditorGridStore.enableBlockEditing(state, action);
      case ActionTypes.DISABLE_BLOCK_EDITING:
        return LevelEditorGridStore.disableBlockEditing(state);
      case ActionTypes.SET_CURRENT_BLOCK:
        return LevelEditorGridStore.setCurrentBlock(state, action);
      case ActionTypes.EDITOR_BLOCK_MOVE_LEFT:
        return LevelEditorGridStore.moveEditingBlock(state, {x: -1});
      case ActionTypes.EDITOR_BLOCK_MOVE_RIGHT:
        return LevelEditorGridStore.moveEditingBlock(state, {x: 1});
      case ActionTypes.EDITOR_BLOCK_MOVE_UP:
        return LevelEditorGridStore.moveEditingBlock(state, {y: -1});
      case ActionTypes.EDITOR_BLOCK_MOVE_DOWN:
        return LevelEditorGridStore.moveEditingBlock(state, {y: 1});
      default:
        return state;
    }
  }

  static nextDetromino(state, action) {
    let {data} = state;

    data = GridStore._syncData(data, true, BlockType.ORIGINAL);

    let {detrominoType = DetrominoType.DEFAULT} = action;
    let detromino = new Detromino({
      id  : new Date().getTime(),
      type: detrominoType,
    });

    detromino = detromino.set("x", detromino.getMiddleXPos());

    data = data.set("detromino",
      Algorithm.getLowestValidPosition(data.get("matrix"), detromino)
    );

    return state.set("data", GridStore._syncData(data));
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

    return state.set("data", GridStore._syncData(data, false));
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
      return state;
    }

    let target = Algorithm.getLowestValidPosition(data.get("matrix"),
      detromino.set("x", targetX));
    if (!target) {
      return state;
    }

    return state.set("data",
      GridStore._syncData(data.set("detromino", target), false));
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
  static moveEditingBlock(state, delta) {
    // todo implement this
  }

  /**
   * Sets block editing
   * @private
   */
  static _setBlockEditing(state, isBlockEditing) {
    let gridState = state.get("editorState");

    return state.set("editorState",
      gridState.set("isEditingBlock", isBlockEditing));
  }

  static enableBlockEditing(state, action) {
    let {block} = action;
    let x = block ? block.get("x") : -1;
    let y = block ? block.get("y") : -1;

    let editorState = state.get("editorState")
      .set("x", x)
      .set("y", y)
      .set("blockType", block.get("blockType"));

    return LevelEditorGridStore._setBlockEditing(state.set("editorState",
      editorState), true);
  }

  static disableBlockEditing(state) {
    return LevelEditorGridStore._setBlockEditing(state, false);
  }

  static setCurrentBlock(state, action) {
    let gridState = state.get("editorState");

    return state.set("editorState",
      gridState.set("blockType", action.blockType));
  }


  initState() {
    return this.getInitialState();
  }
}

export default new LevelEditorGridStore();