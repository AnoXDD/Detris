/**
 * Created by Anoxic on 9/24/2017.
 *
 * A store for the queue holding detrominos
 */


import {ReduceStore} from "flux/utils";

import Dispatcher from "../Dispatcher";
import LocalStorageLoader from "../storeListener/LocalStorageLoader";

import ActionTypes from "../enum/ActionTypes";
import Queue from "./Queue";

class QueueStore extends ReduceStore {
  constructor() {
    super(Dispatcher);
  }

  static reset() {
    return new Queue();
  }

  getInitialState() {
    let state = QueueStore.reset();

    let localQueue = LocalStorageLoader.loadQueueFromLocalStorage();
    if (localQueue) {
      return state.set("queue", localQueue);
    }

    return state;
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.RESET_GRID:
        return QueueStore.reset();
      case ActionTypes.APPLY_DATA:
        return QueueStore.applyData(action);
      case ActionTypes.NEXT_DETROMINO_IN_GAME:
        return QueueStore.pop(state);
      case ActionTypes.NEXT_DETROMINO_IN_EDITOR:
      case ActionTypes.ADD_DETROMINO_TO_QUEUE:
        return QueueStore.push(state, action.detrominoType);
      case ActionTypes.REDO_IN_EDITOR:
      case ActionTypes.REDO_IN_GAME:
        return QueueStore.redo(state);
      case ActionTypes.UNDO_IN_EDITOR:
      case ActionTypes.UNDO_IN_GAME:
        return QueueStore.undo(state);
      default:
        return state;
    }
  }

  static pop(state) {
    state = state.set("queue", state.get("queue").pop());

    state.get("history").record(state);

    return state;
  }

  /**
   * Pushes a new detromino type into the queue
   * @param state
   * @param {DetrominoType|string} type
   * @return {*}
   */
  static push(state, type) {
    state = state.set("queue", state.get("queue").push(type));

    state.get("history").record(state);

    return state;
  }

  static redo(state) {
    return state.get("history").redo() || state;
  }

  static undo(state) {
    return state.get("history").undo() || state;
  }

  static applyData(action) {
    let {levelDataUnit} = action;
    return levelDataUnit.get("queue");
  }
}

export default new QueueStore();