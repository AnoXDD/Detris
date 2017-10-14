/**
 * Created by Anoxic on 9/21/2017.
 *
 * The list of actions that can be dispatched
 */

import GridSize from "./grid/GridSize";
import BlockType from "./block/BlockType";
import DetrominoType from "./detromino/DetrominoType";
import Block from "./block/Block";

/**
 * Converts a grid to an 2d array. Note the matrix is first indexed by y-axis, then x-axis
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
   * @param {Grid} grid
   * @param {Detromino} detromino
   */
  isOverlapping(grid, detromino) {
      let gridArray = gridMapToArray(grid);
      let detrominoArray = detromino.getRotatedBlocks().valueSeq().toArray();
      for (let cell of detrominoArray) {
        let gridCell = gridArray[cell.get("y")][cell.get("x")];
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
   * Returns a detromino at the vertically lowest position on the grid. If no
   * such detromino exists, return null
   * @param {Grid} grid the grid
   * @param {Detromino} detromino the given detromino that has `x` position on
   *   the grid
   */
  getLowestValidPosition(grid, detromino) {
    for (let y = GridSize.HEIGHT - detromino.height(); y >= 0; --y) {
      if (!Algorithm.isOverlapping(grid, detromino.set("y", y))) {
        return detromino.set("y", y);
      }
    }

    return null;
  },


  /**
   * Returns the initial valid block that can be edited. This method was called
   * when the player switches to block editing mode in the level editor.
   * @param {LevelEditorGrid} state
   * @return {Block} a valid editing block. `null` if no valid block
   */
  getInitialValidEditingBlock(state) {
    let grid = state.get("data");
    let detromino = grid.get("detromino");
    let x = detromino.get("x");
    let y = detromino.get("y");

    let matrix = gridMapToArray(grid.get("grid"));
    let blockType = BlockType.NONE;
    for (; y < GridSize.HEIGHT; ++y) {
      if (matrix[y][x] && matrix[y][x].get("type") !== BlockType.DETROMINO) {
        blockType = matrix[y][x].get("type");
        break;
      }
    }

    if (y === -1) {
      return null;
    }

    return new Block({
      x, y, blockType,
    });
  },

  // endregion
};

export default Algorithm;