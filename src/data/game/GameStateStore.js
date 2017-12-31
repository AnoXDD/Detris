/**
 * Created by Anoxic on 9/26/2017.
 * A store for the queue holding detrominos
 */

import {ReduceStore} from "flux/utils";
import Immutable from "immutable";

import Dispatcher from "../Dispatcher";
import LocalStorageLoader from "../storeListener/LocalStorageLoader";

import ActionTypes from "../enum/ActionTypes";
import GameUiState from "../enum/GameUiState";
import GameState from "./GameState";
import OverlayType from "../enum/OverlayTypes";
import TopBarType from "../enum/TopBarTypes";
import EndGameHelper from "./EndGameHelper";

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
          GameUiState.GAME_STARTED));
      case ActionTypes.SET_GAME_UI_STATE:
        let {uiState} = action;

        if (uiState === GameUiState.TUTORIAL) {
          state = state.set("activeOverlay",
            state.get("activeOverlay").add(OverlayType.TUTORIAL_GUIDE));
        }

        return GameStateStore.applyTopBarState(state.set("uiState", uiState));
      case ActionTypes.RESUME:
        return state.set("activeOverlay",
          state.get("activeOverlay").remove(OverlayType.PAUSE_GAME));
      case ActionTypes.PAUSE:
        return state.set("activeOverlay",
          state.get("activeOverlay").add(OverlayType.PAUSE_GAME));
      case ActionTypes.MAYBE_END_GAME:
        if (EndGameHelper.isLevelSolved()) {
          return state.set("activeOverlay",
            state.get("activeOverlay").add(OverlayType.NEXT_LEVEL));
        }

        return state;
      case ActionTypes.SHOW_FULLSCREEN_OVERLAY:
        switch (action.overlayType) {
          case OverlayType.DIALOG:
            let {title = ""} = action;

            return state.set("dialogTitle", title)
              .set("activeOverlay",
                state.get("activeOverlay").add(OverlayType.DIALOG));
          case OverlayType.ABOUT:
          case OverlayType.SETTINGS:
          case OverlayType.LEVEL_EDITOR_IMPORT_EXPORT:
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
          case OverlayType.LEVEL_EDITOR_IMPORT_EXPORT:
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
    let topBar = new Immutable.Set();

    switch (state.get("uiState")) {
      case GameUiState.WELCOME:
        // no-op, nothing to be shown
        break;
      case GameUiState.TUTORIAL:
        topBar = topBar.add(TopBarType.TOP_TUTORIAL_INFO);
        break;
      case GameUiState.SELECT_LEVEL:
        topBar = topBar.add(TopBarType.TOP_BACK);
        break;
      case GameUiState.GAME_STARTED:
        topBar = topBar.add(TopBarType.TOP_PAUSE).add(TopBarType.TOP_BACK);
        break;
      case GameUiState.LEVEL_EDITOR_STARTED:
        topBar = topBar.add(TopBarType.TOP_PAUSE)
          .add(TopBarType.TOP_BACK)
          .add(TopBarType.TOP_IMPORT_EXPORT);
        break;
      default:
    }

    return state.set("topBar", topBar);
  }
}

export default new GameStateStore();