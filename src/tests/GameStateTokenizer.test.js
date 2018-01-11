/**
 * Created by Anoxic on 1/11/2018.
 */

import Immutable from "immutable";

import GameState from "../data/game/GameState";
import GameUiState from "../data/enum/GameUiState";
import TopBarType from "../data/enum/TopBarTypes";
import GameStateTokenizer from "../data/tokenizer/GameStateTokenizer";

test("GameState", () => {
  let gameState = new GameState({
    uiState                : GameUiState.GAME_STARTED,
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

