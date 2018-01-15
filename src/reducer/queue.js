/**
 * Created by Anoxic on 9/24/2017.
 *
 * A store for the queue holding detrominos
 */

import Immutable from "immutable";

import ActionTypes from "../enum/ActionTypes";
import TutorialProgress from "../enum/TutorialProgress";
import DetrominoType from "../enum/DetrominoType";

function reset() {
  return Immutable.List();
}

function getInitialState() {
  return reset();
}

function pop(state) {
  return state.pop();
}

/**
 * Pushes a new detromino type into the queue
 * @param state
 * @param {DetrominoType|string} type
 * @return {*}
 */
function push(state, type) {
  return state.push(type);
}

function applyData(action) {
  // let {levelDataUnit} = action;
  // return levelDataUnit.get("queue");
}

export function reduceQueue(state = getInitialState(), action) {
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
    case ActionTypes.SET_TUTORIAL_PROGRESS:
      switch (action.progress) {
        case TutorialProgress.TUTORIAL_INTRO:
          return reset();
        case TutorialProgress.MECHANISM_DEMO_FREE_PLAY_INTRO:
          return Immutable.List([
            DetrominoType.O,
            DetrominoType.T,
            DetrominoType.I,
            DetrominoType.J,
            DetrominoType.S,
            DetrominoType.L,
            DetrominoType.Z]);
        default:
          return state;
      }
    default:
      return state;
  }
}

export function applyQueue(state, action) {
  return state.set("queue", reduceQueue(state.get("queue"), action));
}

export default {
  applyQueue,
  reduceQueue,
};