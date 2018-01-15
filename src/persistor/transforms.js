/**
 * Created by Anoxic on 1/14/2018.
 */

import {createTransform} from "redux-persist";
import ControlPresets from "../enum/ControlPresets";
import Control from "../state/Control";
import LevelViewData from "../static/LevelViewData";
import ButtonCallbacks from "../state/ButtonCallbacks";
import {reduceButton} from "../reducer/button";
import {restoreState} from "../util/actionStepRecord";
import Level from "../state/Level";

// Will be called before the state is serialized to string, i.e. state is
// Immutable
function serialize(state, key) {
  switch (key) {
    case "control":
      return state.get("controlRecordId");
    case "level":
      return state.set("view", null);
    case "button":
      return state.get("history");
    default:
      return state;
  }
}

// Will be called after the state is deserialized to Immutable, i.e. state is
// Immutable
function deserialize(state, key) {
  switch (key) {
    case "control":
      return ControlPresets[state] || new Control();
    case "level":
      return state ? state.set("view",
        LevelViewData.views().get(state.get("currentPage"))) : new Level();
    case "button":
      let buttonCallbacks = new ButtonCallbacks({
        history: state,
      });

      return restoreState(
        buttonCallbacks, "history", reduceButton);
    default:
      return state;
  }
}

export const transforms = createTransform(serialize, deserialize, {});

export default {
  transforms,
};
