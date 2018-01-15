/**
 * Created by Anoxic on 1/15/2018.
 */

import Algorithm from "./Algorithm";
import LevelDataUnit from "../state/LevelDataUnit";

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

export default {
  x,
  y,
  toLevelDataUnit,
};