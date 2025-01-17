/**
 * Created by Anoxic on 9/21/2017.
 */

import Immutable from "immutable";

import Algorithm from "../util/Algorithm";
import Rotation from "../enum/Rotation";
import GridSize from "../enum/GridSize";
import BlockType from "../enum/BlockType";
import ActionType from "../enum/ActionType";
import Detromino from "../state/Detromino";
import DetrominoType from "../enum/DetrominoType";
import LevelEditorPanel from "../state/LevelEditorPanel";
import Direction from "../enum/Direction";
import BaseGridHelper from "../util/BaseGridHelper";
import LevelDataUnitTokenizer from "../tokenizer/LevelDataUnitTokenizer";
import {applyQueue} from "./queue";
import {nextDetrominoType, prevDetrominoType} from "../util/DetrominoIterator";
import {toLevelDataUnit, x, y} from "../util/levelEditorPanelHelper";
import {
  detrominoHeight,
  detrominoWidth,
  getMiddleXPos
} from "../util/detrominoHelper";

function getInitialState() {
  return nextDetromino(new LevelEditorPanel());
}

function nextDetromino(state) {
  // Store the detromino into the key
  let detromino = state.get("grid").get("detromino");
  if (detromino) {
    state = state.set("key", state.get("key").push(detromino));
  }

  // Convert the detromino to original blocks
  state = _syncData(state, true, BlockType.ORIGINAL);

  // Remove (detromino) target blocks
  let grid = state.get("grid");
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

  detromino = detromino.set("x", getMiddleXPos(detromino));

  grid = grid.set("detromino",
    Algorithm.getLowestValidPositionInEditor(grid.get("matrix"), detromino)
  );

  // Update export token
  state = _updateDetokenizedString(state);

  return _syncData(state.set("grid", grid));
}

/**
 * Updates detokenized string (to be used for export)
 * @param state
 * @private
 */
function _updateDetokenizedString(state) {
  return state.set("detokenized",
    LevelDataUnitTokenizer.detokenizeLevelDataUnit(toLevelDataUnit(state)));
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

  let detromino = state.get("grid").get("detromino");

  if (delta > 0) {
    detromino = detromino.set("type", nextDetrominoType(detromino.get("type")));
  } else if (delta < 0) {
    detromino = detromino.set("type", prevDetrominoType(detromino.get("type")));
  }

  return _syncData(state.set("grid",
    state.get("grid").set("detromino", detromino))
  );
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
 * @param state {LevelEditorPanel} current state of detromino
 * @param delta {Number} the delta of x
 */
function moveX(state, delta) {
  let data = state.get("grid");
  let detromino = data.get("detromino");
  let w = detrominoWidth(detromino);

  let targetX = detromino.get("x") + delta;
  while (targetX >= 0 && targetX + w <= GridSize.WIDTH) {
    let target = Algorithm.getLowestValidPositionInEditor(data.get("matrix"),
      detromino.set("x", targetX));

    if (target) {
      return _syncData(state.set("grid",
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
  let data = state.get("grid");
  let detromino = data.get("detromino");
  let matrix = data.get("matrix");

  let height = detrominoHeight(detromino);
  let targetY = detromino.get("y") + delta;

  while (targetY >= 0 && targetY + height <= GridSize.HEIGHT) {
    detromino = detromino.set("y", targetY);
    if (Algorithm.isFitForNewDetrominoInEditor(matrix, detromino)) {
      return _syncData(state.set("grid",
        data.set("detromino", detromino)));
    }

    targetY += delta;
  }

  return state;
}

/**
 * Moves the grid of the block target whose type is to be changed
 * @param {LevelEditorPanel} state
 * @param {string|Direction} direction
 */
function moveEditingBlock(state, direction) {
  let grid = state.get("grid");

  let block = Algorithm.findNextEditableBlock(grid.get("matrix"),
    grid.get("detromino"),
    x(state),
    y(state),
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
  let block = state.get("grid")
    .get("matrix")[y(state)][x(state)];

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

    let grid = state.get("grid").get("grid").set(block.get("id"), block);
    state = state.set("grid", state.get("grid").set("grid", grid));
  }
  // Update editor state
  let gridState = state.get("editorState").set("blockType", action.blockType);

  return _syncData(state.set("editorState",
    gridState));
}

function processImportedLevelEditorData(state, action) {
  let {text} = action;

  try {
    let detromino = state.get("grid").get("detromino");
    let dataUnit = LevelDataUnitTokenizer.tokenizeLevelDataUnit(text);

    state = _syncData(state
      .set("detokenized", text)
      .set("queue", dataUnit.get("queue"))
      .set("grid", dataUnit.get("grid").set("detromino", detromino)));

    // Reposition detromino if necessary
    let grid = state.get("grid");
    return _syncData(state.set("grid", grid.set("detromino",
      Algorithm.getLowestValidPositionInEditor(grid.get("matrix"), detromino)
    )));
  } catch (e) {
    console.error("Unable to parse string, with error\n", e);
  }

  return state.set("invalidImportId", Date.now());
}

/**
 * Overwrite current state grid and queue
 * @param state
 * @param action
 */
function applyLevelEditorGrid(state, action) {
  let {grid, queue} = action;

  return _syncData(state.set("grid", grid).set("queue", queue));
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
  // Just in case (not in rotate), we make sure detromino is placed at the
  // right position
  let baseGrid = state.get("grid");
  let detromino = baseGrid.get("detromino");
  let gridMap = baseGrid.get("grid");

  let newDetromino = Algorithm.repositionDetrominoIfNecessary(detromino,
    gridMap,
    blockType);
  if (!newDetromino) {
    return state;
  }

  // Check if the new detromino has a new location
  if (newDetromino.get("x") !== detromino.get("x") ||
    newDetromino.get("y") !== detromino.get("y")) {
    // If so, reset the location
    detromino = Algorithm
      .getLowestValidPositionInEditor(baseGrid.get("matrix"), newDetromino);

    if (!detromino) {
      return state;
    }
  }


  return state.set("grid",
    BaseGridHelper.syncData(state.get("grid"),
      updateMatrix,
      blockType,
      state.get("detrominoTargets")));
}

function applyGrid(state, action) {
  switch (action.type) {
    case ActionType.INIT_GRID:
    case ActionType.RESET_GRID:
      return getInitialState();
    case ActionType.NEXT_DETROMINO_IN_EDITOR:
      return nextDetromino(state);
    case ActionType.NEXT_DETROMINO_SHAPE:
      return cycleDetrominoShape(state, 1);
    case ActionType.PREV_DETROMINO_SHAPE:
      return cycleDetrominoShape(state, -1);
    // case ActionType.ROTATE:
    // return rotate(state);
    case ActionType.EDITOR_DETROMINO_MOVE_LEFT:
      return moveX(state, -1);
    case ActionType.EDITOR_DETROMINO_MOVE_RIGHT:
      return moveX(state, 1);
    case ActionType.EDITOR_DETROMINO_MOVE_UP:
      return moveY(state, -1);
    case ActionType.EDITOR_DETROMINO_MOVE_DOWN:
      return moveY(state, 1);
    case ActionType.ENABLE_BLOCK_EDITING:
      return enableBlockEditing(state, action);
    case ActionType.DISABLE_BLOCK_EDITING:
      return disableBlockEditing(state);
    case ActionType.SET_BLOCKTYPE:
      return setCurrentBlock(state, action);
    case ActionType.EDITOR_BLOCK_MOVE_LEFT:
      return moveEditingBlock(state, Direction.LEFT);
    case ActionType.EDITOR_BLOCK_MOVE_RIGHT:
      return moveEditingBlock(state, Direction.RIGHT);
    case ActionType.EDITOR_BLOCK_MOVE_UP:
      return moveEditingBlock(state, Direction.UP);
    case ActionType.EDITOR_BLOCK_MOVE_DOWN:
      return moveEditingBlock(state, Direction.DOWN);
    case ActionType.IMPORT_LEVEL_EDITOR_DATA:
      return processImportedLevelEditorData(state, action);
    case ActionType.APPLY_LEVEL_EDITOR_GRID:
      return applyLevelEditorGrid(state, action);
    default:
      return state;
  }
}

export default function reduce(state = getInitialState(), action) {
  if (action.type === ActionType.RESET) {
    return getInitialState();
  }

  if (action.type !== ActionType.SET_TUTORIAL_PROGRESS) {
    state = applyQueue(state, action);
  }

  return applyGrid(state, action);
}
