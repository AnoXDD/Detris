/**
 * Created by Anoxic on 11/17/2017.
 */

import NotificationState from "./NotificationState";
import ActionTypes from "../enum/ActionTypes";
import NotificationLevel from "../enum/NotificationLevel";
import EndGameHelper from "../game/EndGameHelper";
import createFluxStore from "../../reducer/createFluxStore";

function getInitialState() {
  return new NotificationState();
}

function reduce(state, action) {
  switch (action.type) {
    case ActionTypes.DISPLAY_INFO:
      return display(state, NotificationLevel.INFO,
        action.message);
    case ActionTypes.DISPLAY_SUCCESS:
      return display(state, NotificationLevel.SUCCESS,
        action.message);
    case ActionTypes.DISPLAY_ERROR:
      return display(state, NotificationLevel.ERROR,
        action.message);
    case ActionTypes.UNDO_IN_GAME:
    case ActionTypes.SHOW_FULLSCREEN_OVERLAY:
    case ActionTypes.HIDE_FULLSCREEN_OVERLAY:
    case ActionTypes.SET_GAME_UI_STATE:
      return hide(state);
    case ActionTypes.MAYBE_END_GAME:
      if (EndGameHelper.isLevelFailed()) {
        return displayLevelFailed(state);
      }

      return state;
    default:
      return state;
  }
}

function display(state, level, message) {
  return state.set("level", level)
    .set("message", message)
    .set("id", state.get("id") + 1)
    .set("hidden", false);
}

function hide(state) {
  return state.set("id", state.get("id") + 1)
    .set("hidden", true);
}

function displayLevelFailed(state) {
  return display(state,
    NotificationLevel.INFO,
    "Looks like you run out of Detrominos. What about undoing some of them?");
}

export default createFluxStore(reduce, getInitialState());