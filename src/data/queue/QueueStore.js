/**
 * Created by Anoxic on 9/24/2017.
 *
 * A store for the queue holding detrominos
 */


import Immutable from "immutable";
import {ReduceStore} from "flux/utils";

import Dispatcher from "../Dispatcher";
import LocalStorageLoader from "../localStorage/LocalStorageLoader";

import ActionTypes from "../enum/ActionTypes";

class QueueStore extends ReduceStore {
  constructor() {
    super(Dispatcher);
  }

  static reset() {
    return Immutable.List();
  }

  getInitialState() {
    return LocalStorageLoader.loadQueueFromLocalStorage() || QueueStore.reset();
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.RESET_GRID:
        return QueueStore.reset();
      case ActionTypes.APPLY_DATA:
        return QueueStore.applyData(state, action);
      case ActionTypes.NEXT_DETROMINO_IN_GAME:
        return state.pop();
      case ActionTypes.ADD_DETROMINO_TO_QUEUE:
        return state.push(action.detrominoType);
      default:
        return state;
    }
  }

  static applyData(state, action) {
    let {queueList} = action;

    return queueList;
  }
}

export default new QueueStore();