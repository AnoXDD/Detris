/**
 * Created by Anoxic on 1/15/2018.
 */

import Immutable from "immutable";

import DetrominoShape from "../enum/DetrominoShape";
import Rotation from "../enum/Rotation";
import BlockType from "../enum/BlockType";
import Color from "../enum/Color";
import Block from "../state/Block";
import Algorithm from "./Algorithm";
import GridSize from "../enum/GridSize";

/**
 * Returns the original width, regardless of its rotation
 */
function originalWidth(state) {
  return DetrominoShape[state.get("type")].length;
}

/**
 * Returns the original height, regardless of its height
 */
function originalHeight(state) {
  return DetrominoShape[state.get("type")][0].length;
}

function isRotated90Or270(state) {
  let rotation = state.get("rotation");
  return rotation === Rotation.DEG_90 || rotation === Rotation.DEG_270;
}

/**
 * Returns the width after rotation
 */
export function detrominoWidth(state) {
  if (isRotated90Or270(state)) {
    return originalHeight(state);
  }

  return originalWidth(state);
}

/**
 * Returns the height after rotation
 */
export function detrominoHeight(state) {
  if (isRotated90Or270(state)) {
    return originalWidth(state);
  }

  return originalHeight(state);
}

/**
 * Returns an Immutable Map of Block from detromino
 * This function assumes that the positions of blocks are valid
 * @param {Detromino} state
 * @param {BlockType|string} defaultType
 * @param {Color|string} color
 * @param {Immutable.Set} detrominoTargets
 */
export function getRotatedBlocks(state, defaultType = BlockType.DETROMINO,
                                 color = Color.SOLID,
                                 detrominoTargets) {
  let shape = getRotated2dArray(state, true);

  // Generate blocks
  let map = Immutable.Map();
  let x = state.get("x");
  let y = state.get("y");
  let detrominoId = state.get("id");
  for (let dx = 0; dx < shape.length; ++dx) {
    for (let dy = 0; dy < shape[dx].length; ++dy) {
      if (!shape[dx][dy]) {
        continue;
      }

      let id = `${detrominoId}-${shape[dx][dy]}`;
      let type = defaultType;
      if (detrominoTargets && detrominoTargets.has(id)) {
        type = BlockType.DETROMINO_TARGET;
      }

      map = map.set(id, new Block({
        id,
        occupied: true,
        type,
        color,
        x       : x + dx,
        y       : y + dy,
      }));
    }
  }

  return map;
}

/**
 * Returns a copy of detromino shape
 * @param {Detromino} state
 * @param markId - if each element of the shape should be unique
 * @return {Array} a matrix where `matrix[x][y]` is the block at (x,y)
 */
function getRotated2dArray(state, markId = true) {
  let shape = DetrominoShape[state.get("type")]
    .map(arr => arr.slice());
  let rotation = state.get("rotation");

  if (markId) {
    // Mark the sequence id of each block in the detromino
    let id = 1;
    for (let x = 0; x < shape.length; ++x) {
      for (let y = 0; y < shape[x].length; ++y) {
        shape[x][y] = shape[x][y] && id++;
      }
    }
  }

  shape = Algorithm.rotate(shape, rotation);
  return shape;
}

/**
 * Given the width of the grid, returns the position of this detromino's
 * leftmost block on the grid if this detromino is to be placed in the
 * middle. If it can't be placed exactly in the middle, shift it left by one
 * block.
 * @param gridWidth
 */
export function getMiddleXPos(state, gridWidth = GridSize.WIDTH) {
  // todo: implement this
  return 0;
}

export default {
  detrominoWidth,
  detrominoHeight,
  getMiddleXPos,
  getRotatedBlocks,
};