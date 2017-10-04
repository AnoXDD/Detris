/**
 * Created by Anoxic on 9/26/2017.
 * A store for the queue holding detrominos
 */

import Immutable from "immutable";
import {ReduceStore} from "flux/utils";

import Dispatcher from "../Dispatcher";
import LocalStorageLoader from "../localStorage/LocalStorageLoader";

import ActionTypes from "../enum/ActionTypes";
import GameState from "../enum/GameState";
import TopBarState from "./TopBarState";
import Actions from "../enum/Actions";

class GameStateStore extends ReduceStore {
  constructor() {
    super(Dispatcher);
  }

  static reset() {
    return Immutable.Map({
      gameState: GameState.SELECT_LEVEL,
      topBar   : new TopBarState(),
      paused   : false,

      onPause: Actions.pause,
    });
  }

  getInitialState() {
    let state = LocalStorageLoader.loadGameStateFromLocalStorage();
    return GameStateStore.applyTopBarState(state || GameStateStore.reset());
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.START_LEVEL:
        return GameStateStore.applyTopBarState(state.set("gameState",
          GameState.SHOW_GRID));
      case ActionTypes.SET_GAME_STATE:
        return GameStateStore.applyTopBarState(state.set("gameState",
          action.gameState));
      case ActionTypes.RESUME:
        return state
          .set("paused", false)
          .set("onPause", Actions.pause);
      case ActionTypes.PAUSE:
        return state
          .set("paused", true)
          .set("onPause", Actions.resume);
      default:
        return state;
    }
  }

  /**
   * Applies the game state to top bar state
   * @param state
   */
  static applyTopBarState(state) {
    let topBar = state.get("topBar");

    switch (state.get("gameState")) {
      case GameState.WELCOME:
        topBar = topBar
          .set("pause", false)
          .set("back", false);
        break;
      case GameState.SELECT_LEVEL:
        topBar = topBar
          .set("pause", false)
          .set("back", true);
        break;
      case GameState.SHOW_GRID:
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