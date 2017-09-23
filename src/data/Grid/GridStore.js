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
        return GridStore.initState(action);
      case GridActionTypes.APPLY_DETROMINO:
        return GridStore.applyDetromino(state, action.detromino);
      default:
        return state;
    }
  }

  /**
   * Roughly equivalent to return state[x][y] = block;
   */
  static set(state, x, y, block) {
    return state.set(x, state.get(x).set(y, block));
  }

  /**
   * Apples the detromino to current grid state
   */
  static applyDetromino(state, detromino) {
    let {x, y} = detromino;
    // todo implement this

    let shape = detromino.getRotatedShape();

    // todo: apply shape to `state`

    return state;
  }

  static initState(action) {
    let {width, height} = action;
    let state = [];

    for (let i = 0; i < height; ++i) {
      let row = [];
      for (let j = 0; j < width; ++j) {
        row.push(new Block());
      }
      state.push(row);
    }

    return Immutable.fromJS(state);
  }
}

export default new GridStore();