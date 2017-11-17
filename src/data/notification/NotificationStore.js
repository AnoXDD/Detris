/**
 * Created by Anoxic on 11/17/2017.
 */

import Dispatcher from "../Dispatcher";
import GridStore from "../grid/GridStoreClass";
import NotificationState from "./NotificationState";
import ActionTypes from "../enum/ActionTypes";
import NotificationLevel from "../enum/NotificationLevel";

class NotificationStore extends GridStore {
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
      default:
        return state;
    }
  }

  static display(state, level, message) {
    return state.set("level", level)
      .set("message", message)
      .set("id", state.get("id") + 1);
  }
}

export default new NotificationStore();