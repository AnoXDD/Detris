/**
 * Created by Anoxic on 1/14/2018.
 */

import {createTransform} from "redux-persist";
import ControlPresets from "../enum/ControlPresets";
import Control from "../state/Control";
import LevelViewData from "../static/LevelViewData";

// Will be called before the state is serialized to string, i.e. state is
// Immutable
function serialize(state, key) {
  switch (key) {
    case "control":
      return state.get("controlRecordId");
    case "level":
      return state.set("view", null);
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
      return state.set("view",
        LevelViewData.views().get(state.get("currentPage")));
    default:
      return state;
  }
}

export const transforms = createTransform(serialize, deserialize, {});

export default {
  transforms,
};
