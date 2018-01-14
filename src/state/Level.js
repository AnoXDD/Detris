/**
 * Created by Anoxic on 1/10/2018.
 *
 * Stores the data related to levels, including current level, all available
 * level data and available data to be selected (from view)
 */

import Immutable from "immutable";
import LevelViewData from "../data/static/LevelViewData";

const DEFAULT_PAGE = 0;

const LevelStateRecord = Immutable.Record({
  currentLevelId: -1,
  // !! Keep `view` synced with `currentPage`
  currentPage   : DEFAULT_PAGE,
  // LevelViewData.components().get(this.currentPage)
  view          : LevelViewData.views().get(DEFAULT_PAGE),

  isFirstPage: true,
  isLastPage : false,

  // Map<id {String}, LevelCompletion>
  completedLevels: Immutable.Map(),
  // If the user has ever used "undo"
  noUndo         : true,
});

export default LevelStateRecord;