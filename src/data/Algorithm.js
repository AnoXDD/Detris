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
import Rotation from "./enum/Rotation";
import Queue from "./queue/Queue";

/**
 * Converts a grid to an 2d array. Note the matrix is first indexed by y-axis,
 * then x-axis
 * @param {Immutable.Map} grid the grid in `Grid` class
 * @returns {Array|Iterable<K, Array>}
 */
function gridMapToArray(grid) {
  let matrix = new Array(GridSize.HEIGHT).fill().map(
    a => new Array(GridSize.WIDTH).fill());

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
   * Converts a list of detrominos to queues
   * @param key
   */
  convertKeyToQueue(key) {
    return new Queue({
      queue: key.map(detromino => detromino.get("type")),
    });
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
   * Applies detromino blocks to interact with existing blocks (e.g original or
   * target blocks). After this function is called, all detromino blocks should
   * either be eliminated or converted to target blocks)
   * @param {Immutable.Map<K, V>|Grid} grid Immutable map of blocks
   */
  applyDetrominoBlocks(grid) {
    let matrix = gridMapToArray(grid);
    // todo implement this

    // Dummy implementation: remove the following snippet after this function
    // is actually implemented
    // General idea: from where the detromino is placed, keep moving it down
    // one block at a time, until some non-DETROMINO block is above it
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

    // Convert remaining detromino blocks to targets
    for (let x = 0; x < GridSize.WIDTH; ++x) {
      for (let y = 0; y < GridSize.HEIGHT; ++y) {
        if (matrix[y][x] && matrix[y][x].get("type") === BlockType.DETROMINO) {
          grid = grid.set(matrix[y][x].id,
            matrix[y][x] = matrix[y][x].set("type", BlockType.TARGET));
        }
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
   * Removes stale blocks and sinks target blocks to eliminate the gaps between
   * them
   * @param {Immutable.Map<K, V>|grid} grid Immutable map of blocks
   */
  removeStaleAndSinkTargetBlocks(grid) {
    grid = Algorithm.removeStaleBlocks(grid);
    return Algorithm.sinkTargetBlocks(grid);
  },

  /**
   * Sinks target blocks in a 2d matrix
   * @param {GameGrid} grid
   */
  sinkTargetBlocks(grid) {
    let matrix = gridMapToArray(grid);

    for (let x = 0; x < GridSize.WIDTH; ++x) {
      let u = GridSize.HEIGHT - 1, d = u;

      while (u >= 0 && d >= 0) {
        if (u > d) {
          u = d;
        } else if (!matrix[u][x] || matrix[u][x].get("type") !== BlockType.TARGET) {
          // Find the first target block from the bottom
          --u;
        } else if (matrix[d][x]) {
          // Find the first air block from the bottom
          --d;
        } else {
          // Update block information and swap
          matrix[u][x] = matrix[u][x].set("y", d);

          if (matrix[u][x].get("type") !== BlockType.ORIGINAL) {
            matrix[u][x] = matrix[u][x].set("type", BlockType.TARGET);
          }

          grid = grid.set(matrix[u][x].get("id"), matrix[u][x]);

          [matrix[u][x], matrix[d][x]] = [matrix[d][x], matrix[u][x]];
        }
      }
    }

    return grid;
  },

  /**
   * Returns if the block cell is opaque. Used to determine if the detromino
   * can be moved over it
   * @param block
   * @return {boolean}
   */
  isOpaqueBlock(block) {
    if (!block) {
      return true;
    }

    switch (block.get("type")) {
      case BlockType.DETROMINO:
      case BlockType.HIGHLIGHT:
        return true;
      default:
        return false;
    }
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
      if (!Algorithm.isOpaqueBlock(gridCell)) {
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
    if (degree === Rotation.NONE) {
      return shape;
    }

    let width = shape.length;
    let height = shape[0].length;
    if (degree === Rotation.DEG_90) {
      let newShape = Array(height).fill(0).map(x => Array(width).fill(0));
      for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
          newShape[height - 1 - j][i] = shape[i][j];
        }
      }
      return newShape;
    }

    if (degree === Rotation.DEG_180) {
      let newShape = Array(width).fill(0).map(x => Array(height).fill(0));
      for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
          newShape[width - 1 - i][height - 1 - j] = shape[i][j];
        }
      }
      return newShape;
    }

    let newShape = Array(height).fill(0).map(x => Array(width).fill(0));
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        newShape[j][width - 1 - i] = shape[i][j];
      }
    }
    return newShape;
  },

  generateRandomDetrominoType() {
    let shapes = Object.keys(DetrominoType).slice(1);
    return shapes[parseInt(Math.random() * shapes.length, 10)];
  },

  // region grid editor

  /**
   * Returns a detromino at the vertically lowest position on the grid such
   * that there are sufficient space above this detromino to get it removed by
   * player (by placing a detromino). If no such detromino exists, return null
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
    let detromino = state.get("data").get("detromino");
    let initialX = detromino.get("x");
    let matrix = state.get("data").get("matrix");
    let width = detromino.width();

    for (let x = initialX; x < initialX + width; ++x) {
      for (let y = detromino.get("y"); y < GridSize.HEIGHT; ++y) {
        if (matrix[y][x]) {
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
      return y >= detrominoY && y < GridSize.HEIGHT;
    }

    /**
     * Returns the block object if the block at the given x and y coordinate is
     * an editable block
     * @return {Block} a block if editable, null otherwise
     */
    function getEditableBlock(x, y) {
      if (matrix[y][x]) {
        let type = matrix[y][x].get("type");
        if (type === BlockType.DETROMINO || type === BlockType.DETROMINO_TARGET) {
          return matrix[y][x];
        }
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
  },

  /**
   * Applies detromino to the grid by matching target blocks in the grid and
   * remove both. This function assumes that there exist blocks to be matched
   * with target blocks in the detromino
   *
   * @param {Immutable.Map<K, V>|Grid} grid
   * @param {Array} matrix
   * @param {Detromino} detromino
   * @return {Immutable.Map<K, V>|Grid} resulting grid
   */
  displayDetrominoInEditor(grid, matrix, detromino) {
    if (!grid || !matrix || !detromino) {
      return grid;
    }

    let width = detromino.width();
    let height = detromino.height();
    let detrominoX = detromino.get("x");
    let detrominoY = detromino.get("y");

    // Iterate over each column of detromino
    for (let dx = 0; dx < width; ++dx) {
      let x = detrominoX + dx;
      let targets = 0;

      // Calculate the number of target blocks for current column
      for (let dy = 0; dy < height; ++dy) {
        let y = detrominoY + dy;

        if (matrix[y][x] && matrix[y][x].get("type") === BlockType.DETROMINO_TARGET) {
          grid = grid.delete(matrix[y][x].get("id"));
          ++targets;
        }
      }

      // Remove original blocks
      for (let y = detrominoY + height;
           y < GridSize.HEIGHT && targets > 0;
           ++y) {
        if (matrix[y][x]) {
          grid = grid.delete(matrix[y][x].get("id"));
          --targets;
        }
      }
    }

    return grid;
  },

  /**
   * Returns if the target detrominos in the state is valid. It is valid if it
   * suffices all the requirements below:
   *   - Not all detrominos are targets
   *   - There are enough original blocks below it
   *   - For each column, all matched original blocks should be continuous
   *   - The matched blocks should not be flowing
   *
   * @param {Array} matrix
   * @param {Detromino} detromino
   * @return {boolean} a valid editing block. `null` if no valid block
   */
  isTargetDetrominosValid(matrix, detromino) {
    if (!matrix || !detromino) {
      return false;
    }

    let width = detromino.width();
    let height = detromino.height();
    let detrominoX = detromino.get("x");
    let detrominoY = detromino.get("y");
    let isAllTargets = true;

    // Iterate over each column of detromino
    for (let dx = 0; dx < width; ++dx) {
      let x = detrominoX + dx;
      let targets = 0;

      // Calculate the number of target blocks for current column
      for (let dy = 0; dy < height; ++dy) {
        let y = detrominoY + dy;

        if (!matrix[y][x]) {
          continue;
        }

        if (matrix[y][x].get("type") === BlockType.DETROMINO_TARGET) {
          ++targets;
        } else {
          isAllTargets = false;
        }
      }

      if (!targets) {
        continue;
      }

      // Tests original blocks
      let y = detrominoY + height;
      for (; y < GridSize.HEIGHT && targets > 0; ++y) {
        if (matrix[y][x]) {
          let dy = 0;

          for (let t = targets; dy < t && targets > 0; ++dy) {
            if (y + dy >= GridSize.HEIGHT) {
              // Not enough blocks
              return false;
            }

            if (!matrix[y + dy][x]) {
              // Blocks not continuous
              return false;
            }

            // We can check for other eligibility of blocks here ...

            --targets;
          }

          if (y + dy < GridSize.HEIGHT && !matrix[y + dy][x]) {
            // All blocks are matched, but those blocks are floating
            return false;
          }

          break;
        }
      }

      if (targets) {
        // Not enough matched blocks
        return false;
      }
    }

    return !isAllTargets;
  }

  // endregion
};

export default Algorithm;