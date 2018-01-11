/**
 * Created by Anoxic on 1/11/2018.
 */

import Immutable from "immutable";

import GeneralTokenizer from "./GeneralTokenizer";
import Queue from "../queue/Queue";

export default class QueueTokenizer {
  static tokenizeQueue(str) {
    str = GeneralTokenizer.tokenize(str);

    return new Queue({
      queue: Immutable.List(str),
    });
  }

  /**
   * Detokenizes a queue to a string
   * @param {Queue} queue the state stored in QueueStore
   */
  static detokenizeQueue(queue) {
    queue = queue.get("queue").toJS();

    return GeneralTokenizer.detokenize(queue);
  }
}
