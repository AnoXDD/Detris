/**
 * Created by Anoxic on 1/15/2018.
 */

import Algorithm from "./Algorithm";
import LevelDataUnit from "../state/LevelDataUnit";
import {detrominoHeight, getRotatedBlocks} from "./detrominoHelper";
import BaseGrid from "../state/BaseGrid";
import GamePanel from "../state/GamePanel";

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
 * Generates a list of past game panels from LevelDataUnit, sorted latest to oldest
 * @param levelDataUnit
 */
function generatePastGamePanels(levelDataUnit) {
  let keys = levelDataUnit.get("keys");
  let gridMap = levelDataUnit.get("grid").get("grid");
  let gamePanels = [];

  let detrominos = keys.toArray();
  let queue = detrominos.map(d => d.get("type"));

  for (let detromino of detrominos) {
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
      grid: baseGrid,
      queue,
    });
  }

  return gamePanels;
}

export default {
  x,
  y,
  toLevelDataUnit,
};