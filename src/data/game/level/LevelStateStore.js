/**
 * Created by Anoxic on 9/26/2017.
 *
 * Stores the data related to levels, including current level, all available
 * level data and available data to be selected (from view)
 */

import {ReduceStore} from "flux/utils";
import Immutable from "immutable";

import Dispatcher from "../../Dispatcher";
import LevelData from "../static/LevelData";
import LevelViewData from "../static/LevelViewData";

class LevelStateStore extends ReduceStore {
  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return Immutable.Map({
      currentLevel: -1,
      currentPage : 0,
      view        : LevelViewData.get(0),
      // The actual level data
      data        : LevelData,
    });
  }

  reduce(state, action) {
    switch (action.type) {
      default:
        return state;
    }
  }
}

export default new LevelStateStore();

