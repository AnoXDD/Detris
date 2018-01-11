/**
 * Created by Anoxic on 1/11/2018.
 */

import Immutable from "immutable";

import GeneralTokenizer from "./GeneralTokenizer";
import DetrominoTokenizer from "./DetrominoTokenizer";
import BlockTokenizer from "./BlockTokenizer";
import BaseGrid from "../grid/BaseGrid";

export default class GridTokenizer {
  /**
   * Returns the grid. The returned grid does NOT have matrix synced
   * @param str
   * @return {*}
   */
  static tokenizeBaseGrid(str) {
    let grid = GeneralTokenizer.tokenize(str);

    let actualGrid = GridTokenizer.tokenizeActualGrid(grid.grid);
    let detromino = DetrominoTokenizer.tokenizeDetromino(grid.detromino);

    grid = new BaseGrid({
      grid: actualGrid,
      detromino,
    });

    return grid;
  }

  /**
   * Detokenizes a grid to a string
   * @param {BaseGrid} grid
   */
  static detokenizeBaseGrid(grid) {
    let detromino = DetrominoTokenizer.detokenizeDetromino(grid.get("detromino"));
    let actualGrid = GridTokenizer.detokenizeActualGrid(grid.get("grid"));

    return GeneralTokenizer.detokenize({
      grid: actualGrid,
      detromino,
    });
  }

  static tokenizeActualGrid(str) {
    let blocks = GeneralTokenizer.tokenize(str);
    let actualGrid = {};

    for (let block of blocks) {
      let id = GeneralTokenizer.newId();

      actualGrid[id] = BlockTokenizer.tokenizeBlock(block).set("id", id);
    }

    return Immutable.Map(actualGrid);
  }

  /**
   * Detokenizes an actual grid inside of a grid
   * @param {Immutable.Map} actualGrid
   */
  static detokenizeActualGrid(actualGrid) {
    return GeneralTokenizer.detokenize(actualGrid.valueSeq().map(
      block => BlockTokenizer.detokenizeBlock(block)));
  }
}