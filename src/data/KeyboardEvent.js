/**
 * Created by Anoxic on 9/23/2017.
 *
 * A file to handle the keyboard events
 */

import Immutable from "immutable";
import GridActionTypes from "./Grid/GridActionTypes";
import GridActions from "./Grid/GridActions";

const keyMap = Immutable.Map({
  "ArrowLeft" : GridActionTypes.LEFT,
  "ArrowUp"   : GridActionTypes.UP,
  "ArrowRight": GridActionTypes.RIGHT,
  "ArrowDown" : GridActionTypes.DOWN,
  " "         : GridActionTypes.NEW_RANDOM_DETROMINO,
});

function onKeyDown(e) {
  let {key} = e;
  if (!keyMap.has(key)) {
    // console.log(`Key not registered: ${key}`);
    return;
  }

  let action = keyMap.get(key);

  switch (action) {
    case GridActionTypes.NEW_RANDOM_DETROMINO:
      GridActions.sinkTargetBlocks();
      GridActions.newRandomDetromino();
      break;
    case GridActionTypes.LEFT:
      GridActions.moveLeft();
      break;
    case GridActionTypes.UP:
      GridActions.moveUp();
      break;
    case GridActionTypes.RIGHT:
      GridActions.moveRight();
      break;
    case GridActionTypes.DOWN:
      GridActions.moveDown();
      break;
    case GridActionTypes.ROTATE:
      GridActions.rotate();
      break;
    default:
      break;
  }
}

document.addEventListener("keydown", onKeyDown, true);
