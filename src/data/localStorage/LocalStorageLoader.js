/**
 * Created by Anoxic on 9/24/2017.
 *
 * Manager for loading data from cache
 */

import Immutable from "immutable";
import Detromino from "../detromino/Detromino";
import Block from "../block/Block";

const LocalStorageManager = {
  loadQueueFromLocalStorage() {
    if (!localStorage["queue"]) {
      return null;
    }

    return Immutable.fromJS(JSON.parse(localStorage["queue"]));
  },

  loadGridFromLocalStorage() {
    if (!localStorage["grid"]) {
      return null;
    }

    try {
      let state = JSON.parse(localStorage["grid"]);
      state.detromino = new Detromino(state.detromino);
      let ids = Object.keys(state.grid);
      for (let id of ids) {
        state.grid[id] = new Block(state.grid[id]);
      }

      return Immutable.fromJS(state);
    } catch (e) {
      console.error("Unable to load grid information from localStorage");
      return null;
    }
  }
};

export default LocalStorageManager;