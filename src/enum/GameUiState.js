/**
 * Created by Anoxic on 9/26/2017.
 *
 * An enum class to describe current game state
 */

const GameUiState = {
  DEFAULT_STATE: "TUTORIAL_WELCOME",

  TUTORIAL_WELCOME    : "TUTORIAL_WELCOME",
  TUTORIAL            : "TUTORIAL",
  WELCOME             : "WELCOME",
  IN_GAME             : "IN_GAME",
  SELECT_LEVEL        : "SELECT_LEVEL",
  LEVEL_EDITOR_STARTED: "LEVEL_EDITOR_STARTED",
};

export default GameUiState;
