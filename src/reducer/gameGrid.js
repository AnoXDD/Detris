/**
 * Created by Anoxic on 9/21/2017.
 *
 * A base reduce store for the game grid. Can be extended to be used in other
 * grids.
 */

import Algorithm from "../util/Algorithm";
import Rotation from "../enum/Rotation";
import GridSize from "../enum/GridSize";
import BlockType from "../enum/BlockType";
import ActionTypes from "../enum/ActionTypes";
import LocalStorageLoader from "../data/storeListener/LocalStorageLoader";
import Detromino from "../state/Detromino";
import DetrominoType from "../enum/DetrominoType";
import BaseGridHelper from "../util/BaseGridHelper";
import GameGrid from "../state/GameGrid";
import TutorialProgress from "../enum/TutorialProgress";
import TutorialGrid from "../state/TutorialGrid";
import History from "../data/History";


function reset() {
  return new GameGrid();
}

function getInitialState() {
  let savedState = LocalStorageLoader.loadGridFromLocalStorage();
  if (savedState) {
    return _syncData(savedState);
  }

  return _syncData(reset());
}

function applyData(action) {
  let {levelDataUnit} = action;
  return new GameGrid({
    grid: BaseGridHelper.syncData(levelDataUnit.get("grid")),
  });
}

function nextDetromino(state, action) {
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

  state = _syncData(state.set("grid", grid));

  // Record history
  state.get("history").record(state);

  return state;
}

function rotate(state) {
  // todo check if detromino exists
  let grid = state.get("grid");
  let detromino = grid.get("detromino");
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

  return _syncData(state.set("grid", grid), false);
}

/**
 * Moves the block to certain position. If the operation is not doable,
 * return the original state
 * @param state - current state of detromino
 * @param delta - the position delta
 */
function move(state, delta) {
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

  return _syncData(state.set("grid", grid), false);
}

function removeDetromino(state) {
  return _syncData(state, false, BlockType.NONE);
}

function applyDetrominoBlocks(state) {
  let grid = state.get("grid");
  let actualGrid = grid.get("grid");
  grid = grid.set("grid", Algorithm.applyDetrominoBlocks(actualGrid));

  return state.set("grid", grid);
}

function sinkTargetBlocks(state) {
  let grid = state.get("grid");
  let actualGrid = grid.get("grid");
  grid = grid.set("grid",
    Algorithm.removeStaleAndSinkTargetBlocks(actualGrid));

  return state.set("grid", grid);
}

function redo(state) {
  return state.get("history").redo() || state;
}

function undo(state) {
  return state.get("history").undo() || state;
}

function setTutorialGrid(state, progress) {
  let emptyState = reset();
  let baseGrid = null;

  switch (progress) {
    // A list of all the progresses that require change in grid
    case TutorialProgress.MOVE_DETROMINO_INTRO:
    case TutorialProgress.MOVE_DETROMINO_NO_OVERLAP:
    case TutorialProgress.MOVE_DETROMINO_ROTATE:
    case TutorialProgress.MECHANISM_DEMO_I_INTRO:
    case TutorialProgress.MECHANISM_DEMO_I_FALLING:
    case TutorialProgress.MECHANISM_DEMO_I_APPLYING:
    case TutorialProgress.MECHANISM_DEMO_I_RESULT:
    case TutorialProgress.MECHANISM_DEMO_T_INTRO:
    case TutorialProgress.MECHANISM_DEMO_T_FALLING:
    case TutorialProgress.MECHANISM_DEMO_T_FALLING_EXPLANATION:
    case TutorialProgress.MECHANISM_DEMO_T_APPLYING:
    case TutorialProgress.MECHANISM_DEMO_T_TARGET_FALLING:
    case TutorialProgress.MECHANISM_DEMO_T_TARGET_BLOCKS:
    case TutorialProgress.MECHANISM_DEMO_FLOOR_INTRO:
    case TutorialProgress.MECHANISM_DEMO_FLOOR_RESULT:
    case TutorialProgress.MECHANISM_DEMO_FREE_PLAY_INTRO:
      baseGrid = TutorialGrid[progress];
      break;

    default:
      return state;
  }

  return _syncData(emptyState.set("grid", baseGrid));
}

/**
 * A util to sync the class
 * @param state
 * @param {boolean} updateMatrix - should the matrix be updated. Set to false
 *   if the grid is not changed
 * @param {string|BlockType} blockType
 * @param {Immutable.Set} detrominoTargets - optional targets from level
 *   editor to mark detromino blocks as target
 * @private
 */
function _syncData(state,
                   updateMatrix = true,
                   blockType = BlockType.DETROMINO,
                   detrominoTargets) {
  return state.set("grid",
    BaseGridHelper.syncData(state.get("grid"),
      updateMatrix,
      blockType,
      detrominoTargets));
}

export default function reduce(state = getInitialState(), action) {
  switch (action.type) {
    case ActionTypes.RESET_GRID:
      return reset();
    case ActionTypes.APPLY_DATA:
      return applyData(action);
    case ActionTypes.START_LEVEL:
      // Reset history
      return state.set("history", new History());
    case ActionTypes.NEXT_DETROMINO_IN_GAME:
      return nextDetromino(state, action);
    case ActionTypes.ROTATE:
      return rotate(state);
    case ActionTypes.DETROMINO_MOVE_LEFT:
      return move(state, {x: -1});
    case ActionTypes.DETROMINO_MOVE_RIGHT:
      return move(state, {x: 1});
    case ActionTypes.DETROMINO_MOVE_UP:
      return move(state, {y: -1});
    case ActionTypes.DETROMINO_MOVE_DOWN:
      return move(state, {y: 1});
    case ActionTypes.REMOVE_DETROMINO:
      return removeDetromino(state);
    case ActionTypes.APPLY_DETROMINO_BLOCKS:
      return applyDetrominoBlocks(state);
    case ActionTypes.SINK_TARGET_BLOCKS:
      return sinkTargetBlocks(state);
    case ActionTypes.UNDO_IN_GAME:
      return undo(state);
    case ActionTypes.REDO_IN_GAME:
      return redo(state);
    case ActionTypes.SET_TUTORIAL_PROGRESS:
      return setTutorialGrid(state, action.progress);
    default:
      return state;
  }
}
