/**
 * Created by Anoxic on 11/26/2017.
 *
 * A helper to sync the internal part of a base grid
 */


import BlockType from "../enum/BlockType";
import Algorithm from "./Algorithm";
import {getRotatedBlocks} from "./detrominoHelper";
import Color from "../enum/Color";

const BaseGridHelper = {
  /**
   * Syncs the data of states. This includes:
   *  1) Applying detromino to the state
   *  2) Updating the read only 2d array converted from grid
   *
   * @param baseGrid
   * @param {boolean} updateMatrix - should the matrix be updated. Set to false
   *   if the grid is not changed
   * @param {string|BlockType} blockType
   * @param {Immutable.Set} detrominoTargets - optional targets from level
   *   editor to mark detromino blocks as target
   */
  syncData(baseGrid,
           updateMatrix = true,
           blockType = BlockType.DETROMINO,
           detrominoTargets) {
    baseGrid = BaseGridHelper._putDetrominoInGrid(baseGrid,
      blockType,
      detrominoTargets);

    if (!updateMatrix) {
      return baseGrid;
    }

    baseGrid = BaseGridHelper.syncGridToMatrix(baseGrid);

    return baseGrid;
  },


  /**
   * Converts the grid to a 2d vanilla javascript array. This function should
   * only be called when the grid is changed
   * @param baseGrid
   */
  syncGridToMatrix(baseGrid) {
    return baseGrid.set("matrix",
      Algorithm.convertGridToArray(baseGrid.get("grid")));
  },

  /**
   * Simply puts the detromino to the current grid state. It assumes that the
   * detromino is in a valid position
   *
   * This function must be called every time the detromino is changed.
   * @param {BaseGrid} state
   * @param {string|BlockType} blockType - the block type that the detromino is
   *   converting to
   * @param {Immutable.Set} detrominoTargets - optional targets from level
   *   editor to mark detromino blocks as target
   * @private
   */
  _putDetrominoInGrid(state,
                      blockType = BlockType.DETROMINO,
                      detrominoTargets) {
    // Process the raw detromino in the state
    let detromino = state.get("detromino");
    if (!detromino) {
      return state;
    }

    let gridMap = state.get("grid");

    // Apply the processed detromino to the grid
    return state.set("grid",
      gridMap.merge(getRotatedBlocks(detromino,
        blockType,
        Color.SOLID,
        detrominoTargets)));
  },
};

export default BaseGridHelper;