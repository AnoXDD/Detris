/**
 * Created by Anoxic on 9/21/2017.
 *
 * The list of actions that can be dispatched
 */

import GridActionTypes from "./GridActionTypes";
import GridDispatcher from "./GridDispatcher";

const Actions = {
  init(width, height) {
    GridDispatcher.dispatch({
      type: GridActionTypes.INIT,
      width,
      height,
    });
  },

  dropDetrominos(detromino) {
    GridDispatcher.dispatch({
      type: GridActionTypes.APPLY_DETROMINO,
      detromino,
    })
  },

  debug__add() {
    let x = parseInt(Math.random() * 10, 10);
    let y = parseInt(Math.random() * 10, 10);

    console.log(`x:${x}, y:${y}`);
    GridDispatcher.dispatch({
      type: GridActionTypes.APPLY_DETROMINO,
      pos : {x: x, y: y},
    })
  },
};

export default Actions;