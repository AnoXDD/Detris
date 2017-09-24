/**
 * Created by Anoxic on 9/21/2017.
 *
 * The list of actions that can be dispatched
 */

import GridSize from "./Grid/GridSize";
import BlockType from "./Block/BlockType";

function gridMapToArray(grid) {
  let matrix = [...new Array(GridSize.HEIGHT).keys()].map(
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
   * @param grid
   */
  sinkFloatingBlocks(grid) {
    // todo implement this
    return grid;
  },

  /**
   * Sinks target blocks to eliminate the gaps between them
   * @param grid
   */
  sinkTargetBlocks(grid) {
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
   * Rotates a shape
   * @param shape - a native JavaScript 2d array
   * @param degree - an enum defined in Rotation.js
   */
  rotate(shape, degree) {
    // todo implement this
    return shape;
  }
};

export default Algorithm;