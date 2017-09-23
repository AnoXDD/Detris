/**
 * Created by Anoxic on 9/21/2017.
 */

import Immutable from "immutable";
import {ReduceStore} from "flux/utils";

import GridActionTypes from "./GridActionTypes";
import GridDispatcher from "./GridDispatcher";
import Block from "../Block/Block";
import Color from "../Color";

class GridStore extends ReduceStore {
  constructor() {
    super(GridDispatcher);
  }

  getInitialState() {
    return Immutable.List();
  }

  reduce(state, action) {
    switch (action.type) {
      case GridActionTypes.INIT:
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

    // todo: apply shape to `state`

    return state;
  }

  initState(action) {
    return this.getInitialState();
  }
}

export default new GridStore();