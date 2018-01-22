/**
 * Created by Anoxic on 11/17/2017.
 */

import NotificationState from "../state/Notification";
import ActionType from "../enum/ActionType";
import NotificationLevel from "../enum/NotificationLevel";

function getInitialState() {
  return new NotificationState();
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

export default function reduce(state = getInitialState(), action) {
  switch (action.type) {
    case ActionType.RESET:
      return getInitialState();
    case ActionType.DISPLAY_INFO:
      return display(state, NotificationLevel.INFO,
        action.message);
    case ActionType.DISPLAY_SUCCESS:
      return display(state, NotificationLevel.SUCCESS,
        action.message);
    case ActionType.DISPLAY_ERROR:
      return display(state, NotificationLevel.ERROR,
        action.message);
    case ActionType.UNDO_IN_GAME:
    case ActionType.SHOW_FULLSCREEN_OVERLAY:
    case ActionType.HIDE_FULLSCREEN_OVERLAY:
    case ActionType.SET_GAME_UI_STATE:
      return hide(state);
    case ActionType.LEVEL_FAIL:
      return displayLevelFailed(state);
    default:
      return state;
  }
}
