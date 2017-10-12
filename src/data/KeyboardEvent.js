/**
 * Created by Anoxic on 9/23/2017.
 *
 * A file to handle the keyboard events
 */

import Immutable from "immutable";
import Actions from "./enum/Actions";
import Direction from "./enum/Direction";

const keyMap = Immutable.Map({
  "ArrowLeft" : () => Actions.moveDetrominoInGame(Direction.LEFT),
  "ArrowUp"   : () => Actions.moveDetrominoInGame(Direction.UP),
  "ArrowRight": () => Actions.moveDetrominoInGame(Direction.RIGHT),
  "ArrowDown" : () => Actions.moveDetrominoInGame(Direction.DOWN),
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
