/**
 * Created by Anoxic on 9/21/2017.
 *
 * An enum class to list the kind of actions grid will execute
 */

const ActionTypes = {
  // Initialize the detromino
  INIT_GRID: "INIT_GRID",

  ROTATE   : "ROTATE",

  // Directions
  LEFT: "MOVE_LEFT",
  RIGHT: "MOVE_RIGHT",
  UP: "MOVE_UP",
  DOWN: "MOVE_DOWN",
  DROP: "MOVE_ALL_WAY_DOWN",
};

export default ActionTypes;
