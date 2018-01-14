/**
 * Created by Anoxic on 9/21/2017.
 *
 * An enum class to list the kind of actions grid will execute
 */

const ActionTypes = {
  // Initialize the grid
  INIT_GRID : "INIT_GRID",
  RESET_GRID: "RESET_GRID",

  // Tutorial
  SET_TUTORIAL_PROGRESS : "SET_TUTORIAL_PROGRESS",
  SET_TUTORIAL_COMPLETED: "SET_TUTORIAL_COMPLETED",

  // Game
  SET_GAME_UI_STATE: "STATE_GAME_STATE",
  START_LEVEL      : "START_LEVEL",
  PAUSE            : "PAUSE",
  RESUME           : "RESUME",
  LEVEL_SUCCESS    : "LEVEL_SUCCESS",
  LEVEL_FAIL       : "LEVEL_FAIL",

  // UI change
  HIDE_ALL_FULLSCREEN_OVERLAY: "HIDE_ALL_FULLSCREEN_OVERLAY",
  SHOW_FULLSCREEN_OVERLAY    : "SHOW_FULLSCREEN_OVERLAY",
  HIDE_FULLSCREEN_OVERLAY    : "HIDE_FULLSCREEN_OVERLAY",

  // Level navigation
  LEVEL_NEXT_PAGE: "LEVEL_NEXT_PAGE",
  LEVEL_PREV_PAGE: "LEVEL_PREV_PAGE",

  // Grid
  APPLY_DATA: "APPLY_DATA",

  // Detrominos
  NEXT_DETROMINO_IN_GAME  : "NEXT_DETROMINO_IN_GAME",
  NEXT_DETROMINO_IN_EDITOR: "NEXT_DETROMINO_IN_EDITOR",
  ROTATE                  : "ROTATE",
  DETROMINO_MOVE_LEFT     : "DETROMINO_MOVE_LEFT",
  DETROMINO_MOVE_RIGHT    : "DETROMINO_MOVE_RIGHT",
  DETROMINO_MOVE_UP       : "DETROMINO_MOVE_UP",
  DETROMINO_MOVE_DOWN     : "DETROMINO_MOVE_DOWN",
  UNDO_IN_GAME            : "UNDO_IN_GAME",
  REDO_IN_GAME            : "REDO_IN_GAME",

  // Grid editor
  ENABLE_BLOCK_EDITING       : "ENABLE_BLOCK_EDITING",
  DISABLE_BLOCK_EDITING      : "DISABLE_BLOCK_EDITING",
  EDITOR_DETROMINO_MOVE_LEFT : "EDITOR_DETROMINO_MOVE_LEFT",
  EDITOR_DETROMINO_MOVE_RIGHT: "EDITOR_DETROMINO_MOVE_RIGHT",
  EDITOR_DETROMINO_MOVE_UP   : "EDITOR_DETROMINO_MOVE_UP",
  EDITOR_DETROMINO_MOVE_DOWN : "EDITOR_DETROMINO_MOVE_DOWN",
  EDITOR_BLOCK_MOVE_LEFT     : "EDITOR_BLOCK_MOVE_LEFT",
  EDITOR_BLOCK_MOVE_RIGHT    : "EDITOR_BLOCK_MOVE_RIGHT",
  EDITOR_BLOCK_MOVE_UP       : "EDITOR_BLOCK_MOVE_UP",
  EDITOR_BLOCK_MOVE_DOWN     : "EDITOR_BLOCK_MOVE_DOWN",
  SET_BLOCKTYPE              : "SET_BLOCKTYPE",
  NEXT_DETROMINO_SHAPE       : "NEXT_DETROMINO_SHAPE",
  PREV_DETROMINO_SHAPE       : "PREV_DETROMINO_SHAPE",
  UNDO_IN_EDITOR             : "UNDO_IN_EDITOR",
  REDO_IN_EDITOR             : "REDO_IN_EDITOR",

  // Block manipulation
  REMOVE_DETROMINO      : "REMOVE_DETROMINO",
  APPLY_DETROMINO_BLOCKS: "APPLY_DETROMINO_BLOCKS",
  SINK_TARGET_BLOCKS    : "SINK_TARGET_BLOCKS",

  // Notification System
  DISPLAY_INFO   : "DISPLAY_INFO",
  DISPLAY_SUCCESS: "DISPLAY_SUCCESS",
  DISPLAY_ERROR  : "DISPLAY_ERROR",

  // Debug actions
  NEW_RANDOM_DETROMINO  : "NEW_RANDOM_DETROMINO",
  ADD_DETROMINO_TO_QUEUE: "ADD_DETROMINO_TO_QUEUE",
};

export default ActionTypes;
