/**
 * Created by Anoxic on 10/10/2017.
 */

import Immutable from "immutable";
import GameUiState from "../enum/GameUiState";

const GameStateRecord = Immutable.Record({
  uiState      : GameUiState.DEFAULT_STATE,
  topBar       : Immutable.Set(),
  dialogTitle  : "",
  // A set of {OverlayType} that should be visible
  activeOverlay: Immutable.Set(),

  levelEditorExportString: "",
});

class GameState extends GameStateRecord {
  isShowingLevelEditor() {
    return this.get("uiState") === GameUiState.LEVEL_EDITOR_STARTED;
  }
}

export default GameState;
