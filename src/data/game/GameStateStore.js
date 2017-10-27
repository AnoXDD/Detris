/**
 * Created by Anoxic on 9/26/2017.
 * A store for the queue holding detrominos
 */

import {ReduceStore} from "flux/utils";

import Dispatcher from "../Dispatcher";
import LocalStorageLoader from "../localStorage/LocalStorageLoader";

import ActionTypes from "../enum/ActionTypes";
import GameUiState from "../enum/GameUiState";
import GameState from "./GameState";
import OverlayType from "../enum/OverlayTypes";

class GameStateStore extends ReduceStore {
  constructor() {
    super(Dispatcher);
  }

  static reset() {
    return new GameState();
  }

  getInitialState() {
    let state = LocalStorageLoader.loadGameStateFromLocalStorage();
    return GameStateStore.applyTopBarState(state || GameStateStore.reset());
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.START_LEVEL:
        return GameStateStore.applyTopBarState(state.set("uiState",
          GameUiState.SHOW_GRID));
      case ActionTypes.SET_GAME_UI_STATE:
        return GameStateStore.applyTopBarState(state.set("uiState",
          action.uiState));
      case ActionTypes.RESUME:
        return state.set("activeOverlay",
          state.get("activeOverlay").remove(OverlayType.PAUSE_GAME));
      case ActionTypes.PAUSE:
        return state.set("activeOverlay",
          state.get("activeOverlay").add(OverlayType.PAUSE_GAME));
      case ActionTypes.SHOW_FULLSCREEN_OVERLAY:
        switch (action.overlayType) {
          case OverlayType.DIALOG:
            let {title = ""} = action;

            return state.set("dialogTitle", title)
              .set("activeOverlay",
                state.get("activeOverlay").add(OverlayType.DIALOG));
          case OverlayType.ABOUT:
          case OverlayType.SETTINGS:
            return state.set("activeOverlay",
              state.get("activeOverlay").add(action.overlayType));
          default:
            return state;
        }
      case ActionTypes.HIDE_FULLSCREEN_OVERLAY:
        switch (action.overlayType) {
          case OverlayType.DIALOG:
          case OverlayType.ABOUT:
          case OverlayType.SETTINGS:
            return state.set("activeOverlay",
              state.get("activeOverlay").remove(action.overlayType));
          default:
            return state;
        }
      case ActionTypes.HIDE_ALL_FULLSCREEN_OVERLAY:
        return GameStateStore.hideAllFloatingWindows(state);
      default:
        return state;
    }
  }

  static hideAllFloatingWindows(state) {
    return state.set("activeOverlay", state.get("activeOverlay").clear());
  }

  /**
   * Applies the game state to top bar state
   * @param state
   */
  static applyTopBarState(state) {
    let topBar = state.get("topBar");

    switch (state.get("uiState")) {
      case GameUiState.WELCOME:
        topBar = topBar
          .set("pause", false)
          .set("back", false);
        break;
      case GameUiState.SELECT_LEVEL:
        topBar = topBar
          .set("pause", false)
          .set("back", true);
        break;
      case GameUiState.SHOW_GRID:
      case GameUiState.SHOW_LEVEL_EDITOR:
        topBar = topBar
          .set("pause", true)
          .set("back", false);
        break;
      default:
    }

    return state.set("topBar", topBar);
  }
}

export default new GameStateStore();