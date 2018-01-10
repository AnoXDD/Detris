/**
 * Created by Anoxic on 11/17/2017.
 */

import {ReduceStore} from "flux/utils";

import Dispatcher from "../Dispatcher";
import NotificationState from "./NotificationState";
import ActionTypes from "../enum/ActionTypes";
import NotificationLevel from "../enum/NotificationLevel";
import EndGameHelper from "../game/EndGameHelper";

class NotificationStore extends ReduceStore {
  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return new NotificationState();
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.DISPLAY_INFO:
        return NotificationStore.display(state, NotificationLevel.INFO,
          action.message);
      case ActionTypes.DISPLAY_SUCCESS:
        return NotificationStore.display(state, NotificationLevel.SUCCESS,
          action.message);
      case ActionTypes.DISPLAY_ERROR:
        return NotificationStore.display(state, NotificationLevel.ERROR,
          action.message);
      case ActionTypes.UNDO_IN_GAME:
      case ActionTypes.SHOW_FULLSCREEN_OVERLAY:
      case ActionTypes.HIDE_FULLSCREEN_OVERLAY:
      case ActionTypes.SET_GAME_UI_STATE:
        return NotificationStore.hide(state);
      case ActionTypes.MAYBE_END_GAME:
        if (EndGameHelper.isLevelFailed()) {
          return NotificationStore.displayLevelFailed(state);
        }

        return state;
      default:
        return state;
    }
  }

  static display(state, level, message) {
    return state.set("level", level)
      .set("message", message)
      .set("id", state.get("id") + 1)
      .set("hidden", false);
  }

  static hide(state) {
    return state.set("id", state.get("id") + 1)
      .set("hidden", true);
  }

  static displayLevelFailed(state) {
    return NotificationStore.display(state,
      NotificationLevel.INFO,
      "Looks like you run out of Detrominos. What about undoing some of them?");
  }

  static displayEndGame
}

export default new NotificationStore();