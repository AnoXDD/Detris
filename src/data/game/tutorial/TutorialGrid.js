/**
 * Created by Anoxic on 1/2/2018.
 *
 * A class to store pre-processed BaseGrid in tutorial
 */

import Immutable from "immutable";

import Detromino from "../../detromino/Detromino";
import DetrominoType from "../../detromino/DetrominoType";
import Block from "../../block/Block";
import BlockType from "../../block/BlockType";
import BaseGrid from "../../grid/BaseGrid";

/**
 * Converts a map of {x,y} to grid map for BaseGrid
 * @param {Array} blocks
 * @param {BlockType} type
 */
function blocksToGridMap(blocks, type) {
  let grid = {};
  for (let block of blocks) {
    let {x, y} = block;
    let id = `h-${x}-${y}`;
    grid[id] = new Block({
      x, y, id, type,
    });
  }

  return grid;
}

let detromino = null;
let highlightBlocks = null;
let originalBlocks = null;
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
  detromino: detromino.set("x", detromino.getMiddleXPos()),
  grid     : Immutable.Map(grid),
});

// endregion

// region MOVE_DETROMINO_NO_OVERLAP

detromino = new Detromino({
  id  : detrominoId,
  type: DetrominoType.I,
  x   : 3,
  y   : 9,
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
  ...[...new Array(10)]
    .map((a, x) =>
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
  ...[...new Array(10)]
    .map((a, x) =>
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
  {x: 0, y: 17,},
  {x: 1, y: 17,},
  {x: 2, y: 17,},
  {x: 7, y: 17,},
  {x: 8, y: 17,},
  {x: 9, y: 17,},
  ...[...new Array(10)]
    .map((a, x) =>
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

// region

originalBlocks = [
  {x: 0, y: 17,},
  {x: 1, y: 17,},
  {x: 2, y: 17,},
  {x: 7, y: 17,},
  {x: 8, y: 17,},
  {x: 9, y: 17,},
  ...[...new Array(10)]
    .map((a, x) =>
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
};

export default TutorialGrid;