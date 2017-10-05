/**
 * Created by Anoxic on 9/26/2017.
 * A store for the queue holding detrominos
 */

import Immutable from "immutable";
import {ReduceStore} from "flux/utils";

import Dispatcher from "../Dispatcher";
import LocalStorageLoader from "../localStorage/LocalStorageLoader";

import ActionTypes from "../enum/ActionTypes";
import GameUiState from "../enum/GameUiState";
import TopBarState from "./TopBarState";
import Actions from "../enum/Actions";
import PauseState from "./PauseState";
import DialogState from "./DialogState";

class GameStateStore extends ReduceStore {
  constructor() {
    super(Dispatcher);
  }

  static reset() {
    return Immutable.Map({
      uiState: GameUiState.SELECT_LEVEL,
      topBar : new TopBarState(),
      pause  : new PauseState(),
      dialog : new DialogState(),
    });
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
        return state.set("pause", new PauseState({
          active : false,
          onPause: Actions.pause,
        }));
      case ActionTypes.PAUSE:
        return state.set("pause", new PauseState({
          active : true,
          onPause: Actions.resume,
        }));
      case ActionTypes.SHOW_DIALOG:
        let {
          onYes = () => {
          },
          onNo = () => {
          }
        } = action;

        return state.set("dialog", new DialogState({
          active: true,
          onYes,
          onNo  : () => {
            onNo();
            Actions.hideDialog();
          },
        }));
      case ActionTypes.HIDE_DIALOG:
        return state.set("dialog", new DialogState({
          active: false,
        }));
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