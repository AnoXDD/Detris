/**
 * Created by Anoxic on 1/11/2018.
 */

import Immutable from "immutable";

import GeneralTokenizer from "./GeneralTokenizer";
import LevelDataUnit from "../data/game/level/LevelDataUnit";
import QueueTokenizer from "./QueueTokenizer";
import GridTokenizer from "./GridTokenizer";
import DetrominoTokenizer from "./DetrominoTokenizer";

export default class LevelDataUnitTokenizer {

  static tokenizeLevelDataUnit(str) {
    let levelDataUnit = GeneralTokenizer.tokenize(str);

    return new LevelDataUnit({
      queue: QueueTokenizer.tokenizeQueue(levelDataUnit.queue),
      grid : GridTokenizer.tokenizeBaseGrid(levelDataUnit.grid),
      key  : Immutable.List(levelDataUnit.key.map(
        de => DetrominoTokenizer.tokenizeDetromino(de))),
    });
  }

  /**
   * Detokenizes a level data unit to a string
   * @param {LevelDataUnit} levelDataUnit
   */
  static detokenizeLevelDataUnit(levelDataUnit) {
    let queue = QueueTokenizer.detokenizeQueue(levelDataUnit.get("queue"));
    let grid = GridTokenizer.detokenizeBaseGrid(levelDataUnit.get("grid"));
    let key = levelDataUnit.get("key")
      .toArray()
      .map(de => DetrominoTokenizer.detokenizeDetromino(de));

    return GeneralTokenizer.detokenize({
      queue, grid, key,
    });
  }
}