/**
 * Created by Anoxic on 1/11/2018.
 */

import Detromino from "../state/Detromino";
import GeneralTokenizer from "./GeneralTokenizer";

const DetrominoKeys = "type rotation x y".split(" ");

export default class DetrominoTokenizer {
  static tokenizeDetromino(str) {
    if (!str) {
      return null;
    }

    return new Detromino({
      id: GeneralTokenizer.newId(),
      ...GeneralTokenizer.tokenize(str),
    });
  }

  /**
   * Detokenizes a detromino to a string
   * @param {Detromino} detromino
   */
  static detokenizeDetromino(detromino) {
    if (!detromino) {
      return "";
    }

    let o = {};
    for (let key of DetrominoKeys) {
      o[key] = detromino.get(key);
    }

    return GeneralTokenizer.detokenize(o);
  }

}