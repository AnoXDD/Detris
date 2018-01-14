/**
 * Created by Anoxic on 1/11/2018.
 */

import Immutable from "immutable";

import LevelState from "../state/Level";
import LevelViewData from "../data/static/LevelViewData";
import CompletedLevel from "../state/LevelCompletion";
import LevelStateTokenizer from "../tokenizer/LevelStateTokenizer";

test("LevelState", () => {
  let levelState = new LevelState({
    currentLevelId: -1,
    currentPage   : 1,
    view          : LevelViewData.views().get(1),

    isFirstPage: false,
    isLastPage : true,

    completedLevels: Immutable.Map({
      1 : new CompletedLevel({
        id    : 1,
        noUndo: false,
      }),
      35: new CompletedLevel({
        id    : 35,
        noUndo: true,
      }),
    }),
    noUndo         : true,
  });

  let levelState2 = LevelStateTokenizer.tokenizeLevelState(LevelStateTokenizer.detokenizeLevelState(
    levelState));

  expect(Immutable.is(levelState, levelState2)).toBeTruthy();
});