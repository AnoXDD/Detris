/**
 * Created by Anoxic on 9/21/2017.
 *
 * The list of actions that can be dispatched
 */

import GridSize from "./grid/GridSize";
import BlockType from "./block/BlockType";
import DetrominoType from "./detromino/DetrominoType";
import Block from "./block/Block";
import Direction from "./enum/Direction";

/**
 * Converts a grid to an 2d array. Note the matrix is first indexed by y-axis,
 * then x-axis
 * @param {Immutable.Map} grid the grid in `Grid` class
 * @returns {Array|Iterable<K, Array>}
 */
function gridMapToArray(grid) {
  let matrix = new Array(GridSize.HEIGHT).fill().map(
    a => new Array(GridSize.WIDTH));

  let cells = grid.valueSeq().toArray();
  for (let cell of cells) {
    matrix[cell.get("y")][cell.get("x")] = cell;
  }

  return matrix;
}

const Algorithm = {
  convertGridToArray(grid) {
    return gridMapToArray(grid);
  },

  /**
   * Returns if the current grid has any blocks whose type is `type`
   */
  hasBlockOfType(grid, type) {
    return grid.valueSeq()
      .toArray()
      .some(cell => cell.type === type);
  },

  /**
   * Sinks the floating blocks whose type is FLOATING to make it not floating
   * anymore. A floating block is defined as a block whose adjacent block below
   * is neither the edge of the grid nor another block another grid
   * @param {Grid} grid Immutable map of blocks
   */
  sinkFloatingBlocks(grid) {
    let matrix = gridMapToArray(grid);
    // todo implement this

    // Dummy implementation: remove the following snippet after this function
    // is actually implemented
    const b = GridSize.HEIGHT - 1;
    for (let x = 0; x < GridSize.WIDTH; ++x) {
      for (let y = 0; y < GridSize.HEIGHT; ++y) {
        if (!matrix[y][x] || matrix[y][x].get("type") !== BlockType.DETROMINO) {
          continue;
        }

        if (matrix[b][x]) {
          // Mark the block as stale
          grid = grid.set(matrix[y][x].id,
            matrix[y][x] = matrix[y][x]
              .set("y", b)
              .set("type", BlockType.STALE));

          // Remove the block
          let id = matrix[b][x].get("id");
          grid = grid.delete(id);
          matrix[b][x] = null;
        }
        break;
      }
    }

    return grid;
  },

  /**
   * Removes stale blocks
   * @param {Grid} grid Immutable map of blocks
   */
  removeStaleBlocks(grid) {
    let blocks = grid.valueSeq().toArray();

    for (let block of blocks) {
      if (block.type === BlockType.STALE) {
        grid = grid.delete(block.get("id"));
      }
    }

    return grid;
  },

  /**
   * Sinks target blocks to eliminate the gaps between them
   * @param {Grid} grid Immutable map of blocks
   */
  sinkTargetBlocks(grid) {
    grid = Algorithm.removeStaleBlocks(grid);

    let matrix = gridMapToArray(grid);

    for (let x = 0; x < GridSize.WIDTH; ++x) {
      let u = GridSize.HEIGHT - 1, d = u;

      while (u >= 0 && d >= 0) {
        if (u > d) {
          u = d;
        } else if (!matrix[u][x]) {
          --u;
        } else if (matrix[d][x]) {
          --d;
        } else {
          // Update block information and swap
          matrix[u][x] = matrix[u][x].set("y", d)
            .set("type", BlockType.TARGET);
          grid = grid.set(matrix[u][x].get("id"), matrix[u][x]);

          [matrix[u][x], matrix[d][x]] = [matrix[d][x], matrix[u][x]];
        }
      }
    }

    return grid;
  },

  /**
   * Returns if grid and detromino is overlapping each other
   * @param {Array} matrix - 2d javascript native array
   * @param {Immutable.Map<string, number>|Detromino} detromino
   */
  isOverlapping(matrix, detromino) {
    let detrominoArray = detromino.getRotatedBlocks().valueSeq().toArray();
    for (let cell of detrominoArray) {
      let gridCell = matrix[cell.get("y")][cell.get("x")];
      if (gridCell && gridCell.get("type") !== BlockType.DETROMINO) {
        return true;
      }
    }
    return false;
  },

  /**
   * Rotates a shape
   * @param {Array} shape a native JavaScript 2d array
   * @param {Rotation} degree an enum defined in Rotation.js
   */
  rotate(shape, degree) {
    // todo implement this
    return shape;
  },

  generateRandomDetrominoType() {
    let shapes = Object.keys(DetrominoType).slice(1);
    return shapes[parseInt(Math.random() * shapes.length, 10)];
  },

  // region grid editor

  /**
   * Returns a detromino at the vertically lowest position on the grid such
   * that there are no other original blocks above the detromino. If no such
   * detromino exists, return null
   * @param {Array} matrix - a 2d JavaScript native array
   * @param {Detromino} detromino - the given detromino that has `x` position
   *   on the grid
   */
  getLowestValidPositionInEditor(matrix, detromino) {
    for (let y = GridSize.HEIGHT - detromino.height(); y >= 0; --y) {
      if (Algorithm.isFitForNewDetrominoInEditor(matrix,
          detromino.set("y", y))) {
        return detromino.set("y", y);
      }
    }

    return null;
  },

  /**
   * Returns if a detromino can fit into current position, given that there are
   * enough empty blocks between the detromino and the edge or the blocks above
   * it, so that the player is able to place it in the gap between
   *
   * @param {Array} matrix
   * @param {Immutable.Map<string, number>|Detromino} detromino
   */
  isFitForNewDetrominoInEditor(matrix, detromino) {
    let height = detromino.height();
    let y = detromino.get("y");

    while (y >= 0 && height-- >= 0) {
      if (Algorithm.isOverlapping(matrix, detromino.set("y", y--))) {
        return false;
      }
    }

    return true;
  },

  /**
   * Returns the initial valid block that can be edited. This method was called
   * when the player switches to block editing mode in the level editor.
   * @param {LevelEditorGrid} state
   * @return {Block} a valid editing block. `null` if no valid block
   */
  getInitialValidEditableBlock(state) {
    let grid = state.get("data");
    let detromino = grid.get("detromino");
    let initialX = detromino.get("x");

    let matrix = gridMapToArray(grid.get("grid"));
    let width = detromino.width();

    for (let x = initialX; x < initialX + width; ++x) {
      for (let y = detromino.get("y"); y < GridSize.HEIGHT; ++y) {
        if (matrix[y][x] && matrix[y][x].get("type") !== BlockType.DETROMINO) {
          let blockType = matrix[y][x].get("type");
          return new Block({
            x, y, blockType,
          });
        }
      }
    }

    return null;
  },

  /**
   * Returns the next editable block following the direction. `null` if not
   * found.
   *
   * Rules:
   *   1) The x coordinate of the result block won't exceed the range of
   * current detromino
   *   2) The y coordinate of the result block won't go above the detromino
   *   3) The block type is not DETROMINO
   *   4) If the algorithm doesn't find any block, it will try to find the
   * block near current row/block. It will look for the block on the left
   * column or higher row before doing so on the right column or lower row
   *
   * @param {Array} matrix - 2d array of the current grid
   * @param {Detromino} detromino
   * @param {Number} x - x coordinate of current editing block
   * @param {Number} y - y coordinate of current editing block
   * @param {Direction} direction
   * @return {Block} with x and y coordinate of the result. `null` if not
   *   found.
   */
  findNextEditableBlock(matrix, detromino, x, y, direction) {
    let detrominoX = detromino.get("x");
    let detrominoY = detromino.get("y");
    let width = detromino.width();

    /**
     * Returns if a given x is in valid range
     * @param x
     * @return {boolean}
     */
    function isValidX(x) {
      return x >= detrominoX && x < detrominoX + width;
    }

    /**
     * Returns if a given y is in valid range
     * @param y
     * @return {boolean}
     */
    function isValidY(y) {
      return y > detrominoY && y < GridSize.HEIGHT;
    }

    /**
     * Returns the block object if the block at the given x and y coordinate is
     * an editable block
     * @return {Block} a block if editable, null otherwise
     */
    function getEditableBlock(x, y) {
      if (matrix[y][x] && matrix[y][x].get("type") !== BlockType.DETROMINO) {
        return matrix[y][x];
      }

      return null;
    }

    /**
     * Finds an editable block on the y-axis, given a starting x, y coordinate
     */
    function findBlockInColumn(x, y, dy) {
      if (!isValidX(x)) {
        return null;
      }

      while (isValidY(y)) {
        let block = getEditableBlock(x, y);
        if (block) {
          return block;
        }
        y += dy;
      }

      return null;
    }

    let dx = 0;

    switch (direction) {
      case Direction.DOWN:
        return findBlockInColumn(x, y + 1, 1);
      case Direction.UP:
        return findBlockInColumn(x, y - 1, -1);
      case Direction.LEFT:
        dx = -1;
        break;
      case Direction.RIGHT:
        dx = 1;
        break;
      default:
        break;
    }

    // eslint-disable-next-line
    while (isValidX(x += dx)) {
      let block = findBlockInColumn(x, y, -1) || findBlockInColumn(x, y, 1);
      if (block) {
        return block;
      }
    }

    return null;
  }
  // endregion
};

export default Algorithm;