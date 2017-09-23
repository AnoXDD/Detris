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
      type: GridActionTypes.INIT_GRID,
      width,
      height,
    });
  },

  applyDetrominos(detromino) {
    GridDispatcher.dispatch({
      type: GridActionTypes.APPLY_DETROMINO,
      detromino,
    })
  },
};

export default Actions;