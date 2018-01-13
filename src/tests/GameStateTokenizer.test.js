/**
 * Created by Anoxic on 1/11/2018.
 */

import Immutable from "immutable";

import GameState from "../state/Game";
import GameUiState from "../enum/GameUiState";
import TopBarType from "../enum/TopBarTypes";
import GameStateTokenizer from "../tokenizer/GameStateTokenizer";

test("GameState", () => {
  let gameState = new GameState({
    uiState                : GameUiState.IN_GAME,
    topBar                 : Immutable.Set([TopBarType.TOP_BACK, TopBarType.TOP_PAUSE]),
    dialogTitle            : "Dialog title",
    activeOverlay          : Immutable.Set([]),
    tutorialCompleted      : true,
    levelEditorExportString: "",
  });

  let gameState2 = GameStateTokenizer.tokenizeGameState(GameStateTokenizer.detokenizeGameState(
    gameState));

  expect(Immutable.is(gameState, gameState2)).toBeTruthy();
});

