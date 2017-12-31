/**
 * Created by Anoxic on 9/26/2017.
 *
 * An enum class to describe current game state
 */

const GameUiState = {
  DEFAULT_STATE: "TUTORIAL_WELCOME",

  TUTORIAL_WELCOME    : "TUTORIAL_WELCOME",
  TUTORIAL_IN_PROGRESS: "TUTORIAL_IN_PROGRESS",
  WELCOME             : "WELCOME",
  GAME_STARTED        : "GAME_STARTED",
  SELECT_LEVEL        : "SELECT_LEVEL",
  LEVEL_EDITOR_STARTED: "LEVEL_EDITOR_STARTED",
};

export default GameUiState;
