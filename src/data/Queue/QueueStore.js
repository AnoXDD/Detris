/**
 * Created by Anoxic on 9/24/2017.
 *
 * A store for the queue holding detrominos
 */


import Immutable from "immutable";
import {ReduceStore} from "flux/utils";

import Dispatcher from "../Dispatcher";
import LocalStorageLoader from "../localStorage/LocalStorageLoader";

import ActionTypes from "../ActionTypes";

class QueueStore extends ReduceStore {
  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return LocalStorageLoader.loadQueueFromLocalStorage() || Immutable.List();
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.APPLY_DATA:
        return QueueStore.applyData(state, action);
      case ActionTypes.NEXT_DETROMINO:
        return state.pop();
      case ActionTypes.ADD_DETROMINO_TO_QUEUE:
        return state.push(action.detrominoType);
      default:
        return state;
    }
  }

  static applyData(state, action) {
    let {detrominoList} = action;

    return detrominoList;
  }
}

export default new QueueStore();