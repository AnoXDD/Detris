/**
 * Created by Anoxic on 9/21/2017.
 */

import Immutable from "immutable";
import {ReduceStore} from "flux/utils";

import GridActionTypes from "./GridActionTypes";
import GridDispatcher from "./GridDispatcher";

class GridStore extends ReduceStore {
  constructor() {
    super(GridDispatcher);
  }

  getInitialState() {
    return Immutable.Map();
  }

  reduce(state, action) {
    switch (action.type) {
      case GridActionTypes.INIT_GRID:
        return this.initState(action);
      case GridActionTypes.APPLY_DETROMINO:
        return GridStore.applyDetromino(state, action.detromino);
      default:
        return state;
    }
  }

  /**
   * Apples the detromino to current grid state
   */
  static applyDetromino(state, detromino) {
    let {x, y} = detromino;
    let shape = detromino.getRotatedBlocks();
    // todo: handle the case if there is a conflict
    return state.merge(shape);
  }

  initState(action) {
    return this.getInitialState();
  }
}

export default new GridStore();