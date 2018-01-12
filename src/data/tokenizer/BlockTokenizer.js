/**
 * Created by Anoxic on 1/11/2018.
 */

import GeneralTokenizer from "./GeneralTokenizer";
import Block from "../Block";

const BlockKeys = "type x y".split(" ");

export default class BlockTokenizer {
  static tokenizeBlock(str) {
    return new Block(GeneralTokenizer.tokenize(str));
  }

  /**
   * Detokenizes a block to a string
   * @param {Block} block
   */
  static detokenizeBlock(block) {
    let o = {};
    for (let key of BlockKeys) {
      o[key] = block.get(key);
    }

    return GeneralTokenizer.detokenize(o);
  }
}