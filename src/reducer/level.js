/**
 * Created by Anoxic on 9/26/2017.
 *
 * Stores the data related to levels, including current level, all available
 * level data and available data to be selected (from view)
 */

import LevelViewData from "../data/static/LevelViewData";
import ActionTypes from "../enum/ActionTypes";
import EndGameManager from "../util/EndGameHelper";
import CompletedLevel from "../state/LevelCompletion";
import LevelState from "../state/Level";

function nextPage(state) {
  if (state.get("isLastPage")) {
    return state;
  }

  let newCurrentPage = state.get("currentPage") + 1;
  return setPage(state, newCurrentPage);
}

function prevPage(state) {
  if (state.get("isFirstPage")) {
    return state;
  }

  let newCurrentPage = state.get("currentPage") - 1;
  return setPage(state, newCurrentPage);
}

/**
 * Updates `isFirstPage` and `isLastPage` from `state`
 * @param state
 */
function setPage(state, newPage) {
  return state
    .set("currentPage", newPage)
    .set("view", LevelViewData.views().get(newPage))
    .set("isFirstPage", newPage === 0)
    .set("isLastPage", newPage === LevelViewData.views().size - 1);
}

export default function reduce(state = new LevelState(), action) {
  switch (action.type) {
    case ActionTypes.LEVEL_NEXT_PAGE:
      return nextPage(state);
    case ActionTypes.LEVEL_PREV_PAGE:
      return prevPage(state);
    case ActionTypes.START_LEVEL:
      return state
        .set("currentLevelId", action.currentLevelId)
        .set("noUndo", true);
    case ActionTypes.UNDO_IN_GAME:
      return state.set("noUndo", false);
    case ActionTypes.MAYBE_END_GAME:
      if (EndGameManager.isLevelSolved()) {
        let id = state.get("currentLevelId");
        let completedLevels = state.get("completedLevels");
        let prevNoUndo = completedLevels.get(id) ? completedLevels.get(id)
          .get("noUndo") : false;

        return state.set("completedLevels",
          completedLevels.set(id, new CompletedLevel({
            id,
            noUndo: prevNoUndo || state.get("noUndo"),
          }))
        );
      }

      return state;
    default:
      return state;
  }
}
