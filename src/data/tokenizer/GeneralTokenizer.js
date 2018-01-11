/**
 * Created by Anoxic on 1/11/2018.
 *
 * A general tokenizer
 */

import {Buffer} from "buffer";
import zlib from "zlib";

let id = 0;

export default class GeneralTokenizer {

  static newId() {
    // It has to be converted to string because Immutable doesn't work well
    // with numbers as keys
    return `${++id}`;
  }

  /**
   * A generic tokenizing function to convert a string to a JavaScript object
   * @param {string} str
   * @return {Object}
   */
  static tokenize(str) {
    return JSON.parse(zlib.inflateSync(new Buffer(str, "base64")).toString());
  }

  /**
   * A generic detokenizing function to convert a JavaScript object to string
   * @param {Object} obj
   */
  static detokenize(obj) {
    return zlib.deflateSync(JSON.stringify(obj)).toString("base64");
  }
}
