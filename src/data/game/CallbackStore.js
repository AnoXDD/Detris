/**
 * Created by Anoxic on 9/26/2017.
 * A store for the queue holding detrominos
 */

import {ReduceStore} from "flux/utils";

import Dispatcher from "../Dispatcher";

import ActionTypes from "../enum/ActionTypes";
import Actions from "../enum/Actions";
import CallbackState from "./CallbackState";
import GameUiState from "../enum/GameUiState";

class CallbackStore extends ReduceStore {
  constructor() {
    super(Dispatcher);
  }

  static reset() {
    return new CallbackState();
  }

  getInitialState() {
    return CallbackStore.reset();
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.START_LEVEL:
        return CallbackStore.hidePauseMenu(
          state.set("onQuit",
            Actions.showDialogForQuitToLevelSelect));
      case ActionTypes.RESUME:
        return CallbackStore.hidePauseMenu(state);
      case ActionTypes.PAUSE:
        return state.set("onBack", Actions.resume);
      case ActionTypes.SET_GAME_UI_STATE:
        switch (action.uiState) {
          case GameUiState.SELECT_LEVEL:
            return state.set("onQuit", Actions.showWelcomePage);
          case GameUiState.SHOW_LEVEL_EDITOR:
            return CallbackStore.hidePauseMenu(state.set("onQuit",
              Actions.showDialogForQuitToWelcome));
          default:
            return state;
        }
      case ActionTypes.SHOW_DIALOG:
        let {
          onYes = () => {
          },
          onNo = () => {
          }
        } = action;

        return state.set("onDialogYes", () => {
          onYes();
          Actions.hideFloatingWindows();
        }).set("onDialogNo", () => {
          onNo();
          Actions.hideDialog();
        });
      case ActionTypes.HIDE_FLOATING_WINDOWS:
        return CallbackStore.hideAllFloatingWindows(state);
      default:
        return state;
    }
  }

  static hideAllFloatingWindows(state) {
    return CallbackStore.hidePauseMenu(state);
  }

  static hidePauseMenu(state) {
    return state.set("onBack", Actions.pause);
  }
}

export default new CallbackStore();