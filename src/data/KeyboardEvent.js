/**
 * Created by Anoxic on 9/23/2017.
 *
 * A file to handle the keyboard events
 */

import Immutable from "immutable";
import GridActions from "./Grid/GridActions";

const keyMap = Immutable.Map({
  "ArrowLeft" : GridActions.moveLeft,
  "ArrowUp"   : GridActions.moveUp,
  "ArrowRight": GridActions.moveRight,
  "ArrowDown" : GridActions.moveDown,
  "Shift"     : GridActions.rotate,
  "Delete"    : GridActions.removeDetromino,
  " "         : () => {
    GridActions.sinkFloatingBlocks();
    GridActions.sinkTargetBlocks();
    GridActions.newRandomDetromino();
  },
});

function onKeyDown(e) {
  let {key} = e;
  if (!keyMap.has(key)) {
    console.log(`Key not registered: ${key}`);
    return;
  }

  let action = keyMap.get(key);
  action();
}

document.addEventListener("keydown", onKeyDown, true);
