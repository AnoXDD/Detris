/**
 * Created by Anoxic on 1/11/2018.
 */

import Immutable from "immutable";

import GeneralTokenizer from "./GeneralTokenizer";

export default class QueueTokenizer {
  static tokenizeQueue(str) {
    str = GeneralTokenizer.tokenize(str);

    return Immutable.List(str);
  }

  /**
   * Detokenizes a queue to a string
   * @param {Immutable.List} queue the state stored in QueueStore
   */
  static detokenizeQueue(queue) {
    queue = queue.toJS();

    return GeneralTokenizer.detokenize(queue);
  }
}
