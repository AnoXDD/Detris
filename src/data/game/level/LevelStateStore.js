/**
 * Created by Anoxic on 9/26/2017.
 *
 * Stores the data related to levels, including current level, all available
 * level data and available data to be selected (from view)
 */

import {ReduceStore} from "flux/utils";
import Immutable from "immutable";

import Dispatcher from "../../Dispatcher";
import LevelViewData from "../static/LevelViewData";
import ActionTypes from "../../enum/ActionTypes";

class LevelStateStore extends ReduceStore {
  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return Immutable.Map({
      currentLevel: -1,
      currentPage : 0,
      view        : LevelViewData.views().get(0),
      isFirstPage : true,
      isLastPage  : false,
    });
  }

  reduce(state, action) {
    switch (action.type) {
      case (ActionTypes.LEVEL_NEXT_PAGE):
        return LevelStateStore.nextPage(state);
      case (ActionTypes.LEVEL_PREV_PAGE):
        return LevelStateStore.prevPage(state);
      case (ActionTypes.START_LEVEL):
        return state.set("currentLevel", action.currentLevel);
      default:
        return state;
    }
  }

  static nextPage(state) {
    if (state.get("isLastPage")) {
      return state;
    }

    let newCurrentPage = state.get("currentPage") + 1;
    return LevelStateStore.setPage(state, newCurrentPage);
  }

  static prevPage(state) {
    if (state.get("isFirstPage")) {
      return state;
    }

    let newCurrentPage = state.get("currentPage") - 1;
    return LevelStateStore.setPage(state, newCurrentPage);
  }

  /**
   * Updates `isFirstPage` and `isLastPage` from `state`
   * @param state
   */
  static setPage(state, newPage) {
    return state
      .set("currentPage", newPage)
      .set("view", LevelViewData.views().get(newPage))
      .set("isFirstPage", newPage === 0)
      .set("isLastPage", newPage === LevelViewData.views().size - 1);
  }
}

export default new LevelStateStore();

