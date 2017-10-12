/**
 * Created by Anoxic on 10/10/2017.
 */

import Immutable from "immutable";
import GameUiState from "../enum/GameUiState";
import TopBarState from "./TopBarState";
import DialogState from "./DialogState";

const GameStateRecord = Immutable.Record({
  uiState : GameUiState.WELCOME,
  topBar  : new TopBarState(),
  pause   : false,
  dialog  : new DialogState(),
  credit  : false,
  settings: false,
});

class GameState extends GameStateRecord {
  isShowingGridEditor() {
    return this.get("uiState") === GameUiState.SHOW_GRID_EDITOR;
  }
}

export default GameState;
