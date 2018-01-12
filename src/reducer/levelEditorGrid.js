/**
 * Created by Anoxic on 9/21/2017.
 */

import Immutable from "immutable";

import Algorithm from "../data/Algorithm";
import Rotation from "../enum/Rotation";
import GridSize from "../data/grid/GridSize";
import BlockType from "../enum/BlockType";
import ActionTypes from "../enum/ActionTypes";
import Detromino from "../data/detromino/Detromino";
import DetrominoType from "../data/detromino/DetrominoType";
import LevelEditorGrid from "../data/grid/LevelEditorGrid";
import Direction from "../enum/Direction";
import BaseGridHelper from "../data/grid/BaseGridHelper";
import LevelDataUnitTokenizer from "../data/tokenizer/LevelDataUnitTokenizer";

function reset() {
  return nextDetromino(new LevelEditorGrid());
}

function nextDetromino(state) {
  // Store the detromino into the key
  let detromino = state.get("data").get("detromino");
  if (detromino) {
    state = state.set("key", state.get("key").push(detromino));
  }

  // Convert the detromino to original blocks
  state = _syncData(state, true, BlockType.ORIGINAL);

  // Remove (detromino) target blocks
  let grid = state.get("data");
  detromino = grid.get("detromino") || new Detromino({
      type: DetrominoType.O, // default value
    });

  grid = grid.set("grid", Algorithm.applyDetrominoInEditor(grid.get("grid"),
    grid.get("matrix"),
    detromino));

  grid = BaseGridHelper.syncGridToMatrix(grid);

  // Place new detromino
  detromino = new Detromino({
    id  : new Date().getTime(),
    type: detromino.get("type"),
  });

  detromino = detromino.set("x", detromino.getMiddleXPos());

  grid = grid.set("detromino",
    Algorithm.getLowestValidPositionInEditor(grid.get("matrix"), detromino)
  );

  // Update export token
  state = _updateDetokenizedString(state);

  state = _syncData(state.set("data", grid));

  // Record history
  state.get("history").record(state);

  return state;
}

/**
 * Updates detokenized string (to be used for export)
 * @param state
 * @private
 */
function _updateDetokenizedString(state) {
  return state.set("detokenized",
    LevelDataUnitTokenizer.detokenizeLevelDataUnit(state.toLevelDataUnit()));
}

/**
 * Cycles over the available detromino shapes
 * @param state
 * @param {Number} delta - positive for next detromino, and negative for
 *   previous detromino
 */
function cycleDetrominoShape(state, delta) {
  if (delta === 0) {
    return state;
  }

  // Clear detromino targets
  state = state.set("detrominoTargets", Immutable.Set());

  let iterator = state.get("detrominoIterator");

  if (delta > 0) {
    iterator.next();
  } else if (delta < 0) {
    iterator.prev();
  }

  return _syncData(state.set("detrominoIterator",
    iterator));
}

function rotate(state) {
  // todo check if detromino exists
  // todo change the position if rotate causes overlap
  // todo clear detrominoTargets
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

  return _syncData(state, false);
}

/**
 * Moves the block horizontally. If the operation is not doable, return the
 * original state
 * @param state {LevelEditorGrid} current state of detromino
 * @param delta {Number} the delta of x
 */
function moveX(state, delta) {
  let data = state.get("data");
  let detromino = data.get("detromino");
  let width = detromino.width();

  let targetX = detromino.get("x") + delta;
  while (targetX >= 0 && targetX + width <= GridSize.WIDTH) {
    let target = Algorithm.getLowestValidPositionInEditor(data.get("matrix"),
      detromino.set("x", targetX));

    if (target) {
      return _syncData(state.set("data",
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
function moveY(state, delta) {
  let data = state.get("data");
  let detromino = data.get("detromino");
  let matrix = data.get("matrix");

  let height = detromino.height();
  let targetY = detromino.get("y") + delta;

  while (targetY >= 0 && targetY + height <= GridSize.HEIGHT) {
    detromino = detromino.set("y", targetY);
    if (Algorithm.isFitForNewDetrominoInEditor(matrix, detromino)) {
      return _syncData(state.set("data",
        data.set("detromino", detromino)));
    }

    targetY += delta;
  }

  return state;
}

/**
 * Moves the grid of the block target whose type is to be changed
 * @param {LevelEditorGrid} state
 * @param {string|Direction} direction
 */
function moveEditingBlock(state, direction) {
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
function _setBlockEditing(state, isBlockEditing) {
  let gridState = state.get("editorState");

  return state.set("editorState",
    gridState.set("isEditingBlock", isBlockEditing));
}

function enableBlockEditing(state, action) {
  let {block} = action;
  let x = block ? block.get("x") : -1;
  let y = block ? block.get("y") : -1;

  let editorState = state.get("editorState")
    .set("x", x)
    .set("y", y)
    .set("blockType", block.get("blockType"));

  return _setBlockEditing(state.set("editorState",
    editorState), true);
}

function disableBlockEditing(state) {
  return _setBlockEditing(state, false);
}

function setCurrentBlock(state, action) {
  // Update the block information
  let {blockType} = action;
  let block = state.grid()
    .get("matrix")[state.y()][state.x()];

  if (blockType === BlockType.DETROMINO) {
    let detrominoTargets = state.get("detrominoTargets")
      .delete(block.get("id"));
    state = state.set("detrominoTargets", detrominoTargets);
  } else if (blockType === BlockType.DETROMINO_TARGET) {
    let detrominoTargets = state.get("detrominoTargets")
      .add(block.get("id"));
    state = state.set("detrominoTargets", detrominoTargets);
  } else {
    // Update the grid
    block = block.set("type", blockType);

    let grid = state.grid().get("grid").set(block.get("id"), block);
    state = state.set("data", state.grid().set("grid", grid));
  }
  // Update editor state
  let gridState = state.get("editorState").set("blockType", action.blockType);

  return _syncData(state.set("editorState",
    gridState));
}

function redo(state) {
  return state.get("history").redo() || state;
}

function undo(state) {
  return state.get("history").undo() || state;
}

/**
 * A wrapper for calling the base class' syncData
 * @param state
 * @param {boolean} updateMatrix - should the matrix be updated. Set to false
 *   if the grid is not changed
 * @param {string|BlockType} blockType
 * @private
 */
function _syncData(state,
                   updateMatrix = true,
                   blockType = BlockType.DETROMINO) {
  state = _syncDetrominoIndex(state);

  return state.set("data",
    BaseGridHelper.syncData(state.get("data"),
      updateMatrix,
      blockType,
      state.get("detrominoTargets")));
}

/**
 * Syncs the index of detromino
 * @param state
 * @private
 */
function _syncDetrominoIndex(state) {
  let iterator = state.get("detrominoIterator");
  let detromino = state.get("data").get("detromino");

  if (!detromino) {
    return state;
  }

  return state.set("data",
    state.get("data")
      .set("detromino", detromino.set("type", iterator.value())));
}

export default function reduce(state = reset(), action) {
  switch (action.type) {
    case ActionTypes.INIT_GRID:
    case ActionTypes.RESET_GRID:
      return reset();
    case ActionTypes.NEXT_DETROMINO_IN_EDITOR:
      return nextDetromino(state);
    case ActionTypes.NEXT_DETROMINO_SHAPE:
      return cycleDetrominoShape(state, 1);
    case ActionTypes.PREV_DETROMINO_SHAPE:
      return cycleDetrominoShape(state, -1);
    // case ActionTypes.ROTATE:
    // return rotate(state);
    case ActionTypes.EDITOR_DETROMINO_MOVE_LEFT:
      return moveX(state, -1);
    case ActionTypes.EDITOR_DETROMINO_MOVE_RIGHT:
      return moveX(state, 1);
    case ActionTypes.EDITOR_DETROMINO_MOVE_UP:
      return moveY(state, -1);
    case ActionTypes.EDITOR_DETROMINO_MOVE_DOWN:
      return moveY(state, 1);
    case ActionTypes.ENABLE_BLOCK_EDITING:
      return enableBlockEditing(state, action);
    case ActionTypes.DISABLE_BLOCK_EDITING:
      return disableBlockEditing(state);
    case ActionTypes.SET_BLOCKTYPE:
      return setCurrentBlock(state, action);
    case ActionTypes.EDITOR_BLOCK_MOVE_LEFT:
      return moveEditingBlock(state, Direction.LEFT);
    case ActionTypes.EDITOR_BLOCK_MOVE_RIGHT:
      return moveEditingBlock(state, Direction.RIGHT);
    case ActionTypes.EDITOR_BLOCK_MOVE_UP:
      return moveEditingBlock(state, Direction.UP);
    case ActionTypes.EDITOR_BLOCK_MOVE_DOWN:
      return moveEditingBlock(state, Direction.DOWN);
    case ActionTypes.UNDO_IN_EDITOR:
      return undo(state);
    case ActionTypes.REDO_IN_EDITOR:
      return redo(state);
    default:
      return state;
  }
}
