/**
 * Created by Anoxic on 1/15/2018.
 */

import Immutable from "immutable";

import Algorithm from "./Algorithm";
import LevelDataUnit from "../state/LevelDataUnit";
import {detrominoHeight, getRotatedBlocks} from "./detrominoHelper";
import BaseGrid from "../state/BaseGrid";
import GamePanel from "../state/GamePanel";
import LevelDataUnitTokenizer from "../tokenizer/LevelDataUnitTokenizer";

export function x(state) {
  return state.get("editorState").get("x");
}

export function y(state) {
  return state.get("editorState").get("y");
}

/**
 * Converts this class and returns a LevelDataUnit
 */
export function toLevelDataUnit(state) {
  let key = state.get("key");

  return new LevelDataUnit({
    key,
    grid : state.get("grid").set("detromino", null),
    queue: Algorithm.convertKeyToQueue(key),
  });
}

/**
 * Generates a list of past game panels from LevelDataUnit, sorted latest to
 * oldest
 * @param {string} token
 * @param {detromino} currentDetromino
 */
export function generatePastGamePanelsFromToken(token) {
  let levelDataUnit = LevelDataUnitTokenizer.tokenizeLevelDataUnit(token);

  let key = levelDataUnit.get("key");
  let gridMap = levelDataUnit.get("grid").get("grid");
  let gamePanels = [];

  let detrominos = key.toArray();
  let queue = detrominos.map(d => d.get("type"));

  for (let detromino of detrominos.reverse()) {
    // Move detromino up its height to make space for falling down
    let fallY = Math.max(detromino.get("y") - detrominoHeight(detromino), 0);
    let newDetromino = detromino.set("y", fallY);
    let gridMapWithDetromino = gridMap.merge(getRotatedBlocks(newDetromino));

    let result = Algorithm.applyDetrominoInGameInstantly(gridMapWithDetromino,
      true);
    let baseGrid = new BaseGrid({
      grid: result,
      detromino,
    });

    queue.pop();

    let gamePanel = new GamePanel({
      grid : baseGrid,
      queue: Immutable.List(queue),
    });

    gamePanels.push(gamePanel);
  }


  return gamePanels;
}

export default {
  x,
  y,
  toLevelDataUnit,
  generatePastGamePanelsFromToken,
};