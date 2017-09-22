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
      case GridActionTypes.DROP_DETROMINO:
        return GridStore.applyDropDetrominos(state, action);
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
   * Apples the block from `action` to current grid state
   * @param state - current grid state
   * @param action - the object that has `pos` and the type of `detrominos`.
   *     `pos` specifies the upper right position of the detrominos.
   * @return the state
   */
  static applyDropDetrominos(state, action) {
    let {pos, detrominos} = action;
    let {x, y} = pos;
    // todo implement this

    let block = state.get(x).get(y);
    block = block.toggleOccupied()
      .set("color",
        block.get("color") === Color.TRANSPARENT ? Color.SOLID : Color.TRANSPARENT);

    state = this.set(state, x, y, block);

    // state[x][y].occupied = !state[x][y].occupied;
    // state[x][y].color = state[x][y].color === Color.TRANSPARENT ?
    // Color.SOLID : Color.TRANSPARENT;

    return state;
  }

  static initState(action) {
    let {width, height} = action;
    let state = [];

    for (let i = 0; i < width; ++i) {
      let row = [];
      for (let j = 0; j < height; ++j) {
        row.push(new Block());
      }
      state.push(row);
    }

    return Immutable.fromJS(state);
  }
}

export default new GridStore();