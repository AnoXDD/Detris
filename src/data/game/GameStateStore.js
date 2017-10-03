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

class GameStateStore extends ReduceStore {
  constructor() {
    super(Dispatcher);
  }

  static reset() {
    return Immutable.Map({gameState: GameState.SELECT_LEVEL});
  }

  getInitialState() {
    return LocalStorageLoader.loadGameStateFromLocalStorage() || GameStateStore.reset();
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.START_LEVEL:
        return state.set("gameState", GameState.SHOW_GRID);
      case ActionTypes.SET_GAME_STATE:
        return state.set("gameState", action.gameState);
      default:
        return state;
    }
  }
}

export default new GameStateStore();