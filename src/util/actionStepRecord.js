/**
 * Created by Anoxic on 1/15/2018.
 */

import Immutable from "immutable";
import ActionTypes from "../enum/ActionTypes";

/**
 * Saves steps to immutable, specified by a key and a type
 * @param immutable - the immutable to save steps
 * @param key - the key to the stored step
 * @param action
 */
export function saveSteps(immutable, key, action) {
  let {type} = action;

  if (!ActionTypes[type]) {
    // Not a valid type, skip
    return immutable;
  }

  let history = immutable.get(key);
  action = Immutable.Map(action);
  return immutable.set(key, history.remove(action).add(action));
}

/**
 * Restores the state from the record, with a reduce function
 * @param immutable - the immutable to restore the state
 * @param key
 * @param {function} reduce
 */
export function restoreState(immutable, key, reduce) {
  let history = immutable.get(key);

  if (!history) {
    return immutable;
  }

  history = history.toJS();

  for (let action of history) {
    immutable = reduce(immutable, action);
  }

  return immutable;
}

export default {
  saveSteps,
  restoreState,
};