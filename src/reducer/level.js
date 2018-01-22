/**
 * Created by Anoxic on 9/26/2017.
 *
 * Stores the data related to levels, including current level, all available
 * level data and available data to be selected (from view)
 */

import LevelViewData from "../static/LevelViewData";
import ActionType from "../enum/ActionType";
import CompletedLevel from "../state/LevelCompletion";
import LevelState from "../state/Level";

function getInitialState() {
  return new LevelState();
}

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

export default function reduce(state = getInitialState(), action) {
  switch (action.type) {
    case ActionType.RESET:
      return getInitialState();
    case ActionType.LEVEL_NEXT_PAGE:
      return nextPage(state);
    case ActionType.LEVEL_PREV_PAGE:
      return prevPage(state);
    case ActionType.START_LEVEL:
      return state
        .set("currentLevelId", action.currentLevelId)
        .set("noUndo", true);
    case ActionType.UNDO_IN_GAME:
      return state.set("noUndo", false);
    case ActionType.LEVEL_SUCCESS:
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
    default:
      return state;
  }
}
