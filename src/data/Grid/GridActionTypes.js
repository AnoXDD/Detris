/**
 * Created by Anoxic on 9/21/2017.
 *
 * An enum class to list the kind of actions grid will execute
 */

const GridActionTypes = {
  // Initialize the grid
  INIT_GRID: "INIT_GRID",

  // Detrominos
  NEXT_DETROMINO      : "NEXT_DETROMINO",
  NEW_RANDOM_DETROMINO: "NEW_RANDOM_DETROMINO",

  ROTATE: "ROTATE",

  // Directions
  LEFT : "MOVE_LEFT",
  RIGHT: "MOVE_RIGHT",
  UP   : "MOVE_UP",
  DOWN : "MOVE_DOWN",
  DROP : "MOVE_ALL_WAY_DOWN",

  // Block manipulation
  REMOVE_DETROMINO: "REMOVE_DETROMINO",
  SINK_TARGET_BLOCK  : "SINK_TARGET_BLOCK",
  SINK_FLOATING_BLOCK: "SINK_FLOATING_BLOCK",
};

export default GridActionTypes;
