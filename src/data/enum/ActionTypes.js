/**
 * Created by Anoxic on 9/21/2017.
 *
 * An enum class to list the kind of actions grid will execute
 */

const ActionTypes = {
  // Initialize the grid
  INIT_GRID : "INIT_GRID",
  RESET_GRID: "RESET_GRID",

  // Game
  SET_GAME_STATE: "STATE_GAME_STATE",
  START_LEVEL   : "START_LEVEL",

  // Level navigation
  LEVEL_NEXT_PAGE: "LEVEL_NEXT_PAGE",
  LEVEL_PREV_PAGE: "LEVEL_PREV_PAGE",

  // Grid
  APPLY_DATA: "APPLY_DATA",

  // Detrominos
  NEXT_DETROMINO: "NEXT_DETROMINO",
  ROTATE        : "ROTATE",

  // Directions
  MOVE_LEFT : "MOVE_LEFT",
  MOVE_RIGHT: "MOVE_RIGHT",
  MOVE_UP   : "MOVE_UP",
  MOVE_DOWN : "MOVE_DOWN",
  DROP      : "MOVE_ALL_WAY_DOWN",

  // Block manipulation
  REMOVE_DETROMINO   : "REMOVE_DETROMINO",
  SINK_TARGET_BLOCK  : "SINK_TARGET_BLOCK",
  SINK_FLOATING_BLOCK: "SINK_FLOATING_BLOCK",

  // Debug actions
  NEW_RANDOM_DETROMINO  : "NEW_RANDOM_DETROMINO",
  ADD_DETROMINO_TO_QUEUE: "ADD_DETROMINO_TO_QUEUE",
};

export default ActionTypes;
