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
import Direction from "../enum/Direction";


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
    //   return LevelEditorGridStore.syncData(savedState);
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
      case ActionTypes.EDITOR_DETROMINO_MOVE_UP:
        return LevelEditorGridStore.moveY(state, -1);
      case ActionTypes.EDITOR_DETROMINO_MOVE_DOWN:
        return LevelEditorGridStore.moveY(state, 1);
      case ActionTypes.ENABLE_BLOCK_EDITING:
        return LevelEditorGridStore.enableBlockEditing(state, action);
      case ActionTypes.DISABLE_BLOCK_EDITING:
        return LevelEditorGridStore.disableBlockEditing(state);
      case ActionTypes.SET_BLOCKTYPE:
        return LevelEditorGridStore.setCurrentBlock(state, action);
      case ActionTypes.EDITOR_BLOCK_MOVE_LEFT:
        return LevelEditorGridStore.moveEditingBlock(state, Direction.LEFT);
      case ActionTypes.EDITOR_BLOCK_MOVE_RIGHT:
        return LevelEditorGridStore.moveEditingBlock(state, Direction.RIGHT);
      case ActionTypes.EDITOR_BLOCK_MOVE_UP:
        return LevelEditorGridStore.moveEditingBlock(state, Direction.UP);
      case ActionTypes.EDITOR_BLOCK_MOVE_DOWN:
        return LevelEditorGridStore.moveEditingBlock(state, Direction.DOWN);
      default:
        return state;
    }
  }

  static nextDetromino(state, action) {
    state = LevelEditorGridStore._syncData(state, true, BlockType.ORIGINAL);

    let {detrominoType = DetrominoType.DEFAULT} = action;
    let detromino = new Detromino({
      id  : new Date().getTime(),
      type: detrominoType,
    });

    detromino = detromino.set("x", detromino.getMiddleXPos());

    let data = state.grid();
    data = data.set("detromino",
      Algorithm.getLowestValidPositionInEditor(data.get("matrix"), detromino)
    );

    return LevelEditorGridStore._syncData(state.set("data", data));
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

    return LevelEditorGridStore._syncData(state, false);
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
    let width = detromino.width();

    let targetX = detromino.get("x") + delta;
    while (targetX >= 0 && targetX + width <= GridSize.WIDTH) {
      let target = Algorithm.getLowestValidPositionInEditor(data.get("matrix"),
        detromino.set("x", targetX));

      if (target) {
        return LevelEditorGridStore._syncData(state.set("data",
          data.set("detromino", target)));
      }

      targetX += delta;
    }

    return state;
  }

  /**
   * Moves the block vertically. If the operation is not doable, return the
   * original state
   * @param state
   * @param {Number} delta - the delta of y
   */
  static moveY(state, delta) {
    let data = state.get("data");
    let detromino = data.get("detromino");
    let matrix = data.get("matrix");

    let height = detromino.height();
    let targetY = detromino.get("y") + delta;

    while (targetY >= 0 && targetY + height <= GridSize.HEIGHT) {
      detromino = detromino.set("y", targetY);
      if (Algorithm.isFitForNewDetrominoInEditor(matrix, detromino)) {
        return LevelEditorGridStore._syncData(state.set("data",
          data.set("detromino", detromino)));
      }

      targetY += delta;
    }

    return state;
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
   * @param {LevelEditorGrid} state
   * @param {string|Direction} direction
   */
  static moveEditingBlock(state, direction) {
    let grid = state.grid();

    let block = Algorithm.findNextEditableBlock(grid.get("matrix"),
      grid.get("detromino"),
      state.x(),
      state.y(),
      direction);

    if (!block) {
      return state;
    }

    return state.set("editorState",
      state.get("editorState")
        .set("x", block.get("x"))
        .set("y", block.get("y")));
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
    // Update the block information
    let {blockType} = action;
    let block = state.grid()
      .get("matrix")[state.y()][state.x()]
      .set("type", blockType);

    let grid = state.grid().get("grid").set(block.get("id"), block);
    state = state.set("data", state.grid().set("grid", grid));

    // Update editor state
    let gridState = state.get("editorState").set("blockType", action.blockType);

    return LevelEditorGridStore._syncData(state.set("editorState",
      gridState));
  }

  /**
   * A wrapper for calling the base class' syncData
   * @param state
   * @param {boolean} updateMatrix - should the matrix be updated. Set to false
   *   if the grid is not changed
   * @param {string|BlockType} blockType
   * @private
   */
  static _syncData(state,
                   updateMatrix = true,
                   blockType = BlockType.DETROMINO) {
    return state.set("data",
      GridStore.syncData(state.get("data"), updateMatrix, blockType));
  }

  initState() {
    return this.getInitialState();
  }
}

export default new LevelEditorGridStore();