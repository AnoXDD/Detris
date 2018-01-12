/**
 * Created by Anoxic on 9/24/2017.
 *
 * A store for the queue holding detrominos
 */

import Immutable from "immutable";
import LocalStorageLoader from "../storeListener/LocalStorageLoader";

import ActionTypes from "../enum/ActionTypes";
import Queue from "./Queue";
import TutorialProgress from "../enum/TutorialProgress";
import DetrominoType from "../detromino/DetrominoType";
import createFluxStore from "../../reducer/createFluxStore";

function reset() {
  return new Queue();
}

function getInitialState() {
  let state = reset();

  let localQueue = LocalStorageLoader.loadQueueFromLocalStorage();
  if (localQueue) {
    return state.set("queue", localQueue);
  }

  return state;
}

function reduce(state, action) {
  switch (action.type) {
    case ActionTypes.RESET_GRID:
      return reset();
    case ActionTypes.APPLY_DATA:
      return applyData(action);
    case ActionTypes.NEXT_DETROMINO_IN_GAME:
      return pop(state);
    case ActionTypes.NEXT_DETROMINO_IN_EDITOR:
    case ActionTypes.ADD_DETROMINO_TO_QUEUE:
      return push(state, action.detrominoType);
    case ActionTypes.REDO_IN_EDITOR:
    case ActionTypes.REDO_IN_GAME:
      return redo(state);
    case ActionTypes.UNDO_IN_EDITOR:
    case ActionTypes.UNDO_IN_GAME:
      return undo(state);
    case ActionTypes.SET_TUTORIAL_PROGRESS:
      switch (action.progress) {
        case TutorialProgress.TUTORIAL_INTRO:
          return reset();
        case TutorialProgress.MECHANISM_DEMO_FREE_PLAY_INTRO:
          return reset()
            .set("queue",
              Immutable.List([
                DetrominoType.O,
                DetrominoType.T,
                DetrominoType.I,
                DetrominoType.J,
                DetrominoType.S,
                DetrominoType.L,
                DetrominoType.Z])
            );
        default:
          return state;
      }
    default:
      return state;
  }
}

function pop(state) {
  state = state.set("queue", state.get("queue").pop());

  state.get("history").record(state);

  return state;
}

/**
 * Pushes a new detromino type into the queue
 * @param state
 * @param {DetrominoType|string} type
 * @return {*}
 */
function push(state, type) {
  state = state.set("queue", state.get("queue").push(type));

  state.get("history").record(state);

  return state;
}

function redo(state) {
  return state.get("history").redo() || state;
}

function undo(state) {
  return state.get("history").undo() || state;
}

function applyData(action) {
  let {levelDataUnit} = action;
  return levelDataUnit.get("queue");
}

export default createFluxStore(reduce, getInitialState());