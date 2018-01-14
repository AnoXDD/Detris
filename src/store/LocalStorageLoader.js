/**
 * Created by Anoxic on 9/24/2017.
 *
 * Manager for loading data from cache
 */

import Immutable from "immutable";
import Grid from "../state/BaseGrid";

const LocalStorageLoader = {
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

    return Grid.fromCompressed(localStorage["grid"]);
  },

  loadGameStateFromLocalStorage() {
    if (!localStorage["gameState"]) {
      return null;
    }

    return Immutable.fromJS(JSON.parse(localStorage["gameState"]));
  }
};

export default LocalStorageLoader;