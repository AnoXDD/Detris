/**
 * Created by Anoxic on 9/23/2017.
 *
 * A file to handle the keyboard events
 */

import Immutable from "immutable";
import Actions from "./enum/Actions";

const keyMap = Immutable.Map({
  "ArrowLeft" : Actions.moveLeft,
  "ArrowUp"   : Actions.moveUp,
  "ArrowRight": Actions.moveRight,
  "ArrowDown" : Actions.moveDown,
  "Shift"     : Actions.rotate,
  "Delete"    : Actions.removeDetromino,
  " "         : Actions.nextDetromino,

  // Temporary debug functions go here
  "=": Actions.debug__addDetrominoToQueue,
  "-": Actions.resetGrid,
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
