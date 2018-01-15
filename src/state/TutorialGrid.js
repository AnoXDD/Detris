/**
 * Created by Anoxic on 1/2/2018.
 *
 * A class to store pre-processed BaseGrid in tutorial
 */

import Immutable from "immutable";

import Detromino from "./Detromino";
import DetrominoType from "../enum/DetrominoType";
import Block from "./Block";
import BlockType from "../enum/BlockType";
import BaseGrid from "./BaseGrid";
import {getMiddleXPos} from "../util/detrominoHelper";

/**
 * Converts a map of {x,y} to grid map for BaseGrid
 * @param {Array} blocks
 * @param {BlockType} type
 */
function blocksToGridMap(blocks, type) {
  let grid = {};
  for (let block of blocks) {
    let {x, y, id = `${type}-${x}-${y}`} = block;
    grid[id] = new Block({
      x, y, id, type,
    });
  }

  return grid;
}

let detromino = null;
let highlightBlocks = null;
let originalBlocks = null;
let targetBlocks = null;
let grid = null;
let detrominoId = Date.now();

// region MOVE_DETROMINO_INTRO

detromino = new Detromino({
  id  : detrominoId,
  type: DetrominoType.I,
  x   : 0,
  y   : 0,
});

highlightBlocks = [
  {x: 3, y: 8},
  {x: 4, y: 8},
  {x: 5, y: 8},
  {x: 6, y: 8},
];

grid = {
  ...blocksToGridMap(highlightBlocks, BlockType.HIGHLIGHT)
};

const MOVE_DETROMINO_INTRO = new BaseGrid({
  detromino: detromino.set("x", getMiddleXPos(detromino)),
  grid     : Immutable.Map(grid),
});

// endregion

// region MOVE_DETROMINO_NO_OVERLAP

detromino = new Detromino({
  id  : detrominoId,
  type: DetrominoType.I,
  x   : 3,
  y   : 8,
});

highlightBlocks = [
  {x: 3, y: 0},
  {x: 4, y: 0},
  {x: 5, y: 0},
  {x: 6, y: 0},
];

originalBlocks = [
  {x: 4, y: 4},
  {x: 5, y: 4},
];

grid = {
  ...blocksToGridMap(highlightBlocks, BlockType.HIGHLIGHT),
  ...blocksToGridMap(originalBlocks, BlockType.ORIGINAL),
};

const MOVE_DETROMINO_NO_OVERLAP = new BaseGrid({
  detromino,
  grid: Immutable.Map(grid),
});

// endregion

// region MOVE_DETROMINO_ROTATE

detromino = new Detromino({
  id  : detrominoId,
  type: DetrominoType.I,
  x   : 3,
  y   : 0,
});

highlightBlocks = [
  {x: 3, y: 6},
  {x: 4, y: 6},
  {x: 5, y: 6},
  {x: 6, y: 6},
];

originalBlocks = [
  {x: 4, y: 4},
  {x: 5, y: 4},

  // Blocks on two sides
  ...[...new Array(5)]
    .map((a, y) =>
      [0, 1, 2, 7, 8, 9].map(x => {
        return {x, y,};
      }))
    .reduce((a, b) => [...a, ...b]),
];

grid = {
  ...blocksToGridMap(highlightBlocks, BlockType.HIGHLIGHT),
  ...blocksToGridMap(originalBlocks, BlockType.ORIGINAL),
};

const MOVE_DETROMINO_ROTATE = new BaseGrid({
  detromino,
  grid: Immutable.Map(grid),
});

// endregion

const MECHANISM_INTRO = new BaseGrid();

// region MECHANISM_DEMO_I_INTRO

detromino = new Detromino({
  id  : detrominoId,
  type: DetrominoType.I,
  x   : 3,
  y   : 0,
});

originalBlocks = [
  {x: 4, y: 17},
  {x: 5, y: 17},
  ...[1, 2, 3, 6, 7, 8]
    .map(x =>
      [17, 18, 19].map(y => {
        return {x, y,};
      }))
    .reduce((a, b) => [...a, ...b]),
];

grid = {
  ...blocksToGridMap(originalBlocks, BlockType.ORIGINAL),
};

const MECHANISM_DEMO_I_INTRO = new BaseGrid({
  detromino,
  grid: Immutable.Map(grid),
});

// endregion

// region MECHANISM_DEMO_I_FALLING

detromino = new Detromino({
  id  : detrominoId,
  type: DetrominoType.I,
  x   : 3,
  y   : 17,
});

originalBlocks = [
  {x: 4, y: 17},
  {x: 5, y: 17},
  ...[1, 2, 3, 6, 7, 8]
    .map(x =>
      [17, 18, 19].map(y => {
        return {x, y,};
      }))
    .reduce((a, b) => [...a, ...b]),
];

grid = {
  ...blocksToGridMap(originalBlocks, BlockType.ORIGINAL),
};

const MECHANISM_DEMO_I_FALLING = new BaseGrid({
  detromino,
  grid: Immutable.Map(grid),
});

// endregion

// region MECHANISM_DEMO_I_APPLYING

originalBlocks = [
  {x: 1, y: 17},
  {x: 2, y: 17},
  {x: 7, y: 17},
  {x: 8, y: 17},
  ...[1, 2, 3, 6, 7, 8]
    .map(x =>
      [18, 19].map(y => {
        return {x, y,};
      }))
    .reduce((a, b) => [...a, ...b]),
];

highlightBlocks = [
  {x: 3, y: 17,},
  {x: 4, y: 17,},
  {x: 5, y: 17,},
  {x: 6, y: 17,},
];

grid = {
  ...blocksToGridMap(originalBlocks, BlockType.ORIGINAL),
  ...blocksToGridMap(highlightBlocks, BlockType.HIGHLIGHT),
};

const MECHANISM_DEMO_I_APPLYING = new BaseGrid({
  grid: Immutable.Map(grid),
});

// endregion

// region MECHANISM_DEMO_I_RESULT

originalBlocks = [
  {x: 1, y: 17,},
  {x: 2, y: 17,},
  {x: 7, y: 17,},
  {x: 8, y: 17,},
  ...[1, 2, 3, 6, 7, 8]
    .map(x =>
      [18, 19].map(y => {
        return {x, y,};
      }))
    .reduce((a, b) => [...a, ...b]),
];

grid = {
  ...blocksToGridMap(originalBlocks, BlockType.ORIGINAL),
};

const MECHANISM_DEMO_I_RESULT = new BaseGrid({
  grid: Immutable.Map(grid),
});

// endregion

// region MECHANISM_DEMO_T_INTRO

detromino = new Detromino({
  id  : detrominoId,
  type: DetrominoType.T,
  x   : 2,
  y   : 0,
});

originalBlocks = [
  {x: 1, y: 17,},
  {x: 2, y: 17,},
  {x: 7, y: 17,},
  {x: 8, y: 17,},
  ...[1, 2, 3, 6, 7, 8]
    .map(x =>
      [18, 19].map(y => {
        return {x, y,};
      }))
    .reduce((a, b) => [...a, ...b]),
];

grid = {
  ...blocksToGridMap(originalBlocks, BlockType.ORIGINAL),
};

const MECHANISM_DEMO_T_INTRO = new BaseGrid({
  detromino,
  grid: Immutable.Map(grid),
});

// endregion

// region MECHANISM_DEMO_T_FALLING

detromino = new Detromino({
  id  : detrominoId,
  type: DetrominoType.T,
  x   : 2,
  y   : 16,
});

originalBlocks = [
  {x: 1, y: 17,},
  {x: 2, y: 17,},
  {x: 7, y: 17,},
  {x: 8, y: 17,},
  ...[1, 2, 3, 6, 7, 8]
    .map(x =>
      [18, 19].map(y => {
        return {x, y,};
      }))
    .reduce((a, b) => [...a, ...b]),
];

grid = {
  ...blocksToGridMap(originalBlocks, BlockType.ORIGINAL),
};

const MECHANISM_DEMO_T_FALLING = new BaseGrid({
  detromino,
  grid: Immutable.Map(grid),
});

// endregion

// region MECHANISM_DEMO_T_FALLING_EXPLANATION

detromino = new Detromino({
  id  : detrominoId,
  type: DetrominoType.T,
  x   : 2,
  y   : 16,
});

originalBlocks = [
  {x: 1, y: 17,},
  {x: 2, y: 17,},
  {x: 7, y: 17,},
  {x: 8, y: 17,},
  ...[1, 2, 3, 6, 7, 8]
    .map(x =>
      [18, 19].map(y => {
        return {x, y,};
      }))
    .reduce((a, b) => [...a, ...b]),
];

highlightBlocks = [
  {x: 2, y: 17,},
];

grid = {
  ...blocksToGridMap(originalBlocks, BlockType.ORIGINAL),
  ...blocksToGridMap(highlightBlocks, BlockType.BLINKING_BLACK),
};

const MECHANISM_DEMO_T_FALLING_EXPLANATION = new BaseGrid({
  detromino,
  grid: Immutable.Map(grid),
});

// endregion

// region MECHANISM_DEMO_T_APPLYING

originalBlocks = [
  {x: 1, y: 17,},
  {x: 7, y: 17,},
  {x: 8, y: 17,},
  ...[1, 2, 3, 6, 7, 8]
    .map(x =>
      [18, 19].map(y => {
        return {x, y,};
      }))
    .reduce((a, b) => [...a, ...b]),
];

targetBlocks = [
  {x: 3, y: 17},
  {x: 3, y: 16},
  {x: 4, y: 17, id: "falling"},
];

grid = {
  ...blocksToGridMap(originalBlocks, BlockType.ORIGINAL),
  ...blocksToGridMap(targetBlocks, BlockType.TARGET),
};

const MECHANISM_DEMO_T_APPLYING = new BaseGrid({
  grid: Immutable.Map(grid),
});

// endregion

// region MECHANISM_DEMO_T_TARGET_FALLING

originalBlocks = [
  {x: 1, y: 17,},
  {x: 7, y: 17,},
  {x: 8, y: 17,},
  ...[1, 2, 3, 6, 7, 8]
    .map(x =>
      [18, 19].map(y => {
        return {x, y,};
      }))
    .reduce((a, b) => [...a, ...b]),
];

highlightBlocks = [
  {x: 4, y: 17},
];

targetBlocks = [
  {x: 3, y: 17},
  {x: 3, y: 16},
  {x: 4, y: 17, id: "falling"},
];

grid = {
  ...blocksToGridMap(originalBlocks, BlockType.ORIGINAL),
  ...blocksToGridMap(highlightBlocks, BlockType.BLINKING),
  ...blocksToGridMap(targetBlocks, BlockType.TARGET),
};

const MECHANISM_DEMO_T_TARGET_FALLING = new BaseGrid({
  grid: Immutable.Map(grid),
});

// endregion

// region MECHANISM_DEMO_T_TARGET_BLOCKS

originalBlocks = [
  {x: 1, y: 17,},
  {x: 7, y: 17,},
  {x: 8, y: 17,},
  ...[1, 2, 3, 6, 7, 8]
    .map(x =>
      [18, 19].map(y => {
        return {x, y,};
      }))
    .reduce((a, b) => [...a, ...b]),
];

targetBlocks = [
  {x: 3, y: 17},
  {x: 3, y: 16},
  {x: 4, y: 19, id: "falling"},
];

grid = {
  ...blocksToGridMap(originalBlocks, BlockType.ORIGINAL),
  ...blocksToGridMap(targetBlocks, BlockType.TARGET),
};

const MECHANISM_DEMO_T_TARGET_BLOCKS = new BaseGrid({
  grid: Immutable.Map(grid),
});

// endregion

// region MECHANISM_DEMO_FLOOR_INTRO

detromino = new Detromino({
  id  : detrominoId,
  type: DetrominoType.O,
  x   : 4,
  y   : 18,
});

const MECHANISM_DEMO_FLOOR_INTRO = new BaseGrid({
  detromino,
});

// endregion

// region MECHANISM_DEMO_FLOOR_RESULT

originalBlocks = [
  {x: 4, y: 18,},
  {x: 5, y: 18,},
  {x: 4, y: 19,},
  {x: 5, y: 19,},
];

grid = {
  ...blocksToGridMap(originalBlocks, BlockType.ORIGINAL),
};

const MECHANISM_DEMO_FLOOR_RESULT = new BaseGrid({
  grid: Immutable.Map(grid),
});

// endregion

// region MECHANISM_DEMO_FREE_PLAY_INTRO

originalBlocks = [
  ...[...new Array(10)]
    .map((a,x) =>
      [14, 16, 18].map(y => {
        return {x, y,};
      }))
    .reduce((a, b) => [...a, ...b]),

  ...[0, 2, 4, 5, 7, 9]
    .map(x =>
      [15, 17, 19].map(y => {
        return {x, y,};
      }))
    .reduce((a, b) => [...a, ...b]),
];

grid = {
  ...blocksToGridMap(originalBlocks, BlockType.ORIGINAL),
};

const MECHANISM_DEMO_FREE_PLAY_INTRO = new BaseGrid({
  grid: Immutable.Map(grid),
});

// endregion


//////////////////////////////////////////////

const TutorialGrid = {
  MOVE_DETROMINO_INTRO,
  MOVE_DETROMINO_NO_OVERLAP,
  MOVE_DETROMINO_ROTATE,
  MECHANISM_INTRO,
  MECHANISM_DEMO_I_INTRO,
  MECHANISM_DEMO_I_FALLING,
  MECHANISM_DEMO_I_APPLYING,
  MECHANISM_DEMO_I_RESULT,
  MECHANISM_DEMO_T_INTRO,
  MECHANISM_DEMO_T_FALLING,
  MECHANISM_DEMO_T_FALLING_EXPLANATION,
  MECHANISM_DEMO_T_APPLYING,
  MECHANISM_DEMO_T_TARGET_FALLING,
  MECHANISM_DEMO_T_TARGET_BLOCKS,
  MECHANISM_DEMO_FLOOR_INTRO,
  MECHANISM_DEMO_FLOOR_RESULT,
  MECHANISM_DEMO_FREE_PLAY_INTRO,
};

export default TutorialGrid;
